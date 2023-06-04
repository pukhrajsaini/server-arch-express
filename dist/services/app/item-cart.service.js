"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3_constant_1 = require("../../constants/s3.constant");
const DbHelper_1 = require("../../helpers/DbHelper");
const item_interface_1 = require("../../interfaces/item.interface");
const moved_item_interface_1 = require("../../interfaces/moved-item.interface");
const item_cart_model_1 = require("../../models/item-cart.model");
const item_model_1 = require("../../models/item.model");
const moved_item_model_1 = require("../../models/moved-item.model");
const file_upload_1 = require("../../utils/file.upload");
class ItemCartService {
    /**
    * @description get moving items details
    * @param user
    * @returns moving items
    */
    movingItemsDetails(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    '$match': {
                        'userId': user._id
                    }
                }, {
                    '$lookup': {
                        'from': 'items',
                        'let': {
                            'itemId': '$itemId'
                        },
                        'as': 'item',
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$eq': [
                                            '$$itemId', '$_id'
                                        ]
                                    }
                                }
                            }, {
                                '$lookup': {
                                    'from': 'users',
                                    'localField': 'borrowerId',
                                    'foreignField': '_id',
                                    'as': 'borrower'
                                }
                            }, {
                                '$unwind': {
                                    'path': '$borrower',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'itemName': 1,
                                    'itemOwner': 1,
                                    'ownerName': 1,
                                    'loanerName': 1,
                                    'consignmentName': 1,
                                    'itemId': 1,
                                    'baseLocation': 1,
                                    'brand': 1,
                                    'type': 1,
                                    'images': 1,
                                    'isApproved': 1,
                                    'borrowerId': 1,
                                    'movingStatus': 1,
                                    'pdf': 1,
                                    'createdAt': 1,
                                    'updatedAt': 1,
                                    'borrower': {
                                        '_id': 1,
                                        'name': 1
                                    }
                                }
                            }
                        ]
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'itemId': 1,
                        'userId': 1,
                        'images': 1,
                        'item': {
                            '$first': '$item'
                        }
                    }
                }
            ];
            return yield item_cart_model_1.default.aggregate(pipeline);
        });
    }
    /**
     * @description upload item's image on items added in cart
     * @param items ItemCartImageType
     * @param user
     * @returns
     */
    uploadMovingCartImages(items, user, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            const directory = s3_constant_1.S3_DIRECTORY.itemCart;
            const itemsIds = Object.keys(items);
            let validObjectid = false;
            if (!itemsIds.length)
                return { validationFailed: true };
            itemsIds.every((id) => {
                validObjectid = (0, DbHelper_1.isValidObjetId)(id);
                return validObjectid;
            });
            if (!validObjectid)
                return { isValidObjectId: true };
            let isValid = true;
            logger.info('check items', { items: Object.keys(items) });
            itemsIds.every((key) => {
                if (items[key])
                    return true;
                isValid = false;
                return false;
            });
            if (!isValid)
                return { validationFailed: false };
            for (const itemId of itemsIds) {
                const images = yield this.uploadPhotos(items[itemId], directory);
                logger.info('images', { images });
                yield item_cart_model_1.default.findOneAndUpdate({ itemId, userId: user._id, }, { itemId, userId: user._id, images }, {
                    upsert: true
                });
                // item.images = images;
                // await item.save();
            }
            yield item_model_1.default.updateMany({ _id: Object.keys(items) }, { movingStatus: item_interface_1.MovingItem.addedToMove });
            return { success: true };
        });
    }
    /**
     * @description update a photo on s3 and in a directory
     * @param photo photo should be uploaded
     * @param directory
     * @returns uploaded image s3 absolute path
     */
    uploadPhoto(photo, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${Date.now()}-${photo.originalFilename}`;
            return yield new file_upload_1.FileUpload().uploadFileOnS3(photo, directory, fileName);
        });
    }
    /**
     * @description upload multiple photos on s3
     * @param photos
     * @param productId
     * @returns uploaded photos urls array
     */
    uploadPhotos(photos, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const photosUrl = [];
            if (Array.isArray(photos)) {
                for (const photo of photos) {
                    photosUrl.push(yield this.uploadPhoto(photo, directory));
                }
            }
            else if (photos) {
                photosUrl.push(yield this.uploadPhoto(photos, directory));
            }
            return photosUrl;
        });
    }
    /**
     * @description end item's moving process and update receiver's images
     * @param itemId
     * @param images
     * @returns moved item
     */
    endProcess(itemId, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const movedItem = yield moved_item_model_1.default.findOne({ itemId, movingStatus: moved_item_interface_1.MovedItemStatus.moving });
            if (!movedItem)
                return { invalidItemId: true };
            const photos = yield this.uploadPhotos(images, s3_constant_1.S3_DIRECTORY.movedItem);
            movedItem.item.receivedImages = photos;
            movedItem.movingStatus = moved_item_interface_1.MovedItemStatus.completed;
            yield item_model_1.default.findByIdAndUpdate(movedItem.itemId, { movingStatus: item_interface_1.MovingItem.assigned });
            yield movedItem.save();
            return { movedItem };
        });
    }
}
exports.default = new ItemCartService();
