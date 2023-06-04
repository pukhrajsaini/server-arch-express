"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../../controllers/admin/item.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const fileupload_middleware_1 = require("../../middlewares/fileupload.middleware");
const item_validator_1 = require("../../validators/admin/item.validator");
class ItemRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post('/add', authentication_middleware_1.default.admin, fileupload_middleware_1.default.upload, item_validator_1.default.addItem, item_controller_1.default.add);
    }
    getRoutes() {
        this.router.get('/list', authentication_middleware_1.default.admin, item_controller_1.default.list);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', authentication_middleware_1.default.admin, fileupload_middleware_1.default.upload, item_controller_1.default.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', authentication_middleware_1.default.admin, item_controller_1.default.deleteImage);
    }
}
exports.default = new ItemRoutes().router;
