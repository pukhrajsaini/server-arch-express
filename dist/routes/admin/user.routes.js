"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/admin/user.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.patchRoutes();
    }
    getRoutes() {
        this.router.get('/list', user_controller_1.default.list);
    }
    patchRoutes() {
        this.router.patch('/change-status/:id', authentication_middleware_1.default.admin, user_controller_1.default.userApprove);
    }
}
exports.default = new UserRoutes().router;
