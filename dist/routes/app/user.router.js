"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/app/user.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/logout', authentication_middleware_1.default.user, user_controller_1.default.logout);
    }
}
exports.default = new UserRouter().router;
