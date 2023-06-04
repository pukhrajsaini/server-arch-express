"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../controllers/app/AuthController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const AuthValidator_1 = require("../../validators/app/AuthValidator");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.use('/signUp', AuthValidator_1.default.signUp, AuthController_1.default.signUp);
        this.router.post('/login', AuthValidator_1.default.login, AuthController_1.default.login);
        this.router.post('/forgot-password', AuthenticationMiddleware_1.default.user, AuthValidator_1.default.forgotPassword, AuthController_1.default.forgotPassword);
    }
    patchRoutes() {
        this.router.patch('/change-password', AuthenticationMiddleware_1.default.user, AuthValidator_1.default.changePassword, AuthController_1.default.changePassword);
        this.router.patch('/verify-account', AuthenticationMiddleware_1.default.user, AuthValidator_1.default.verifyAccount, AuthController_1.default.verifyAccount);
        this.router.patch('/reset-password', AuthenticationMiddleware_1.default.user, AuthValidator_1.default.resetPassword, AuthController_1.default.resetPassword);
    }
}
exports.default = new AuthRoutes().router;
