"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../controllers/admin/AuthController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const AuthValidator_1 = require("../../validators/admin/AuthValidator");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.post('/login', AuthValidator_1.default.login, AuthController_1.default.login);
        this.router.post('/forgot-password', AuthenticationMiddleware_1.default.admin, AuthValidator_1.default.forgotPassword, AuthController_1.default.forgotPassword);
    }
    patchRoutes() {
        this.router.patch('/change-password', AuthenticationMiddleware_1.default.admin, AuthValidator_1.default.changePassword, AuthController_1.default.changePassword);
        this.router.patch('/reset-password', AuthValidator_1.default.resetPassword, AuthController_1.default.resetPassword);
    }
}
exports.default = new AuthRoutes().router;
