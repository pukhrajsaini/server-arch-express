"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../../controllers/app/item.controller");
const test_controller_1 = require("../../controllers/app/test.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const fileupload_middleware_1 = require("../../middlewares/fileupload.middleware");
const item_validator_1 = require("../../validators/admin/item.validator");
class UserItemRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post('/add-moving-item', authentication_middleware_1.default.user, item_validator_1.default.addMovingItem, item_controller_1.default.addMovingItem);
        this.router.post('/add-images', authentication_middleware_1.default.user, fileupload_middleware_1.default.upload, item_controller_1.default.uploadPhotosOnCartItems);
        this.router.post('/moved-item', authentication_middleware_1.default.user, 
        // fileuploadMiddleware.upload,
        item_validator_1.default.movedItem, item_controller_1.default.movedItem);
    }
    patchRoutes() {
        this.router.patch('/end-process/:id', authentication_middleware_1.default.user, fileupload_middleware_1.default.upload, item_controller_1.default.endMoveProcess);
    }
    deleteRoutes() {
        this.router.delete('/delete-item/:id', authentication_middleware_1.default.user, item_controller_1.default.removeItemFromItemCart);
        this.router.delete('/clear-cart', authentication_middleware_1.default.user, item_controller_1.default.clearCart);
    }
    getRoutes() {
        this.router.get('/moving-items', authentication_middleware_1.default.user, item_controller_1.default.movingItemsDetails);
        this.router.get('/list', authentication_middleware_1.default.user, item_controller_1.default.list);
        this.router.get('/details/:id', authentication_middleware_1.default.user, item_controller_1.default.getMovingItemDetails);
        this.router.get('/test', test_controller_1.default.test);
    }
}
exports.default = new UserItemRouter().router;
