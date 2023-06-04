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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const item_model_1 = require("../../models/item.model");
const item_service_1 = require("../../services/admin/item.service");
class ItemController {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ItemData = req.body;
                ItemData.images = req.files.images;
                ItemData.pdf = req.files.pdf;
                const item = yield item_service_1.default.add(ItemData);
                return ResponseHelper_1.default.created(res, res.__('item_created'), {
                    item: item.item
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ItemId = req.params.id;
                const photo = req.files.photo;
                const pdf = req.files.pdf;
                const item = yield item_service_1.default.update(ItemId, req.body, photo, pdf);
                if (!item)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_item_id'));
                res.logMsg = 'Item updated successfully';
                ResponseHelper_1.default.ok(res, res.__('item_updated'), { item: item });
            }
            catch (error) {
                next(error);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const item = yield item_service_1.default.list(queryString);
                if (item) {
                    res.logMsg = `Item list fetched Successfully`;
                    return ResponseHelper_1.default.ok(res, res.__('item_list'), item);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemId = req.params.id;
                const item = yield item_model_1.default.findById(itemId);
                if (!item) {
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_item_id'));
                }
                console.log(item, 'want data');
                item.images = item.images.filter((e) => e !== req.body.url);
                yield item.save();
                if (item) {
                    res.logMsg = `Item deleted  Successfully`;
                    return ResponseHelper_1.default.ok(res, res.__('item_images_deleted'), item);
                }
                console.log(item, 'item');
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ItemController();
