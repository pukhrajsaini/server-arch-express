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
const item_model_1 = require("../../models/item.model");
const api_features_1 = require("../../utils/api-features");
const auth_1 = require("../../utils/auth");
const file_upload_1 = require("../../utils/file.upload");
class ItemService {
    add(ItemData) {
        return __awaiter(this, void 0, void 0, function* () {
            const photos = yield this.uploadPhotos(ItemData.images, s3_constant_1.S3_DIRECTORY.item);
            // console.log(photos, 'photos')
            const pdfUrl = yield this.uploadPdf(ItemData.pdf, s3_constant_1.S3_DIRECTORY.itemPdf);
            ItemData.itemId = yield this.generateItemId();
            const IData = {
                itemName: ItemData.itemName,
                itemOwner: ItemData.itemOwner,
                ownerName: ItemData.ownerName,
                loanerName: ItemData.loanerName,
                consignmentName: ItemData.consignmentName,
                baseLocation: ItemData.baseLocation,
                brand: ItemData.brand,
                itemId: ItemData.itemId,
                type: ItemData.type,
                custom1: ItemData.custom1,
                custom2: ItemData.custom2,
                images: photos,
                borrowerId: ItemData.borrowerId,
                pdf: pdfUrl
            };
            const item = yield item_model_1.default.create(IData);
            return {
                item
            };
        });
    }
    /**
     * @param photo {File} photo to be uploaded
     * @param directory {String} photo directory
     * @returns {Promise<{url: string}>} uploaded photo base path
     */
    // private async uploadPhoto(
    //   photo: any,
    //   directory: string,
    // ): Promise<string> {
    //   const fileName = `${Date.now()}-${photo.originalFilename}`;
    //   return await new FileUpload().uploadFileOnS3(photo, directory, fileName);
    // }
    uploadPhoto(photo, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${Date.now()}-${photo.originalFilename}`;
            return yield new file_upload_1.FileUpload().uploadFileOnS3(photo, directory, fileName);
        });
    }
    uploadPhotos(photos, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const photosUrl = [];
            if (Array.isArray(photos)) {
                for (const photo of photos) {
                    photosUrl.push(yield this.uploadPhoto(photo, productId));
                }
            }
            else if (photos) {
                photosUrl.push(yield this.uploadPhoto(photos, productId));
            }
            return photosUrl;
        });
    }
    uploadPdf(pdf, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${Date.now()}-${pdf.originalFilename}`;
            return yield new file_upload_1.FileUpload().uploadPdfOnS3(pdf, directory, fileName);
        });
    }
    generateItemId() {
        return __awaiter(this, void 0, void 0, function* () {
            let code = new auth_1.Auth().generateVerificationCode(7);
            code = `GT${code}`;
            const isExist = yield item_model_1.default.exists({ itemId: code });
            if (isExist) {
                code = yield this.generateItemId();
            }
            return code;
        });
    }
    update(ItemId, itemData, images, pdf) {
        return __awaiter(this, void 0, void 0, function* () {
            const { itemName, itemOwner, ownerName, loanerName, consignmentName, baseLocation, brand, type, custom1, custom2 } = itemData;
            let item = yield item_model_1.default.findById(ItemId);
            item.itemName = itemName,
                item.itemOwner = itemOwner,
                item.ownerName = ownerName,
                item.loanerName = loanerName,
                item.consignmentName = consignmentName,
                item.baseLocation = baseLocation,
                item.brand = brand,
                item.type = type,
                item.custom1 = custom1,
                item.custom2 = custom2,
                item.pdf = pdf;
            console.log('photos');
            if (images && typeof images !== 'string') {
                const photos = yield this.uploadPhoto(images, s3_constant_1.S3_DIRECTORY.item);
                item.images.push(...photos);
            }
            if (pdf && typeof pdf !== 'string') {
                item.pdf = yield this.uploadPdf(pdf, s3_constant_1.S3_DIRECTORY.itemPdf);
            }
            yield item.save();
            return item;
        });
    }
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = item_model_1.default.find({ isDeleted: false });
            const countFeature = new api_features_1.ApiFeatures(countQuery, queryString)
                .searching(['name'])
                .getCount();
            const lisQuery = item_model_1.default.find({ isDeleted: false });
            const listFeature = new api_features_1.ApiFeatures(lisQuery, queryString)
                .searching(['name'])
                .sorting('-createdAt')
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, count };
        });
    }
}
exports.default = new ItemService();
