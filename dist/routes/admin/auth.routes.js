"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/admin/auth.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const auth_validator_1 = require("../../validators/admin/auth.validator");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.post('/login', auth_validator_1.default.login, auth_controller_1.default.login);
        this.router.post('/change-password', authentication_middleware_1.default.admin, auth_validator_1.default.changePassword, auth_controller_1.default.changePassword);
        this.router.post('/approved', authentication_middleware_1.default.admin, auth_controller_1.default.adminApproved);
        this.router.post('/forgot-password', auth_controller_1.default.forgotPassword);
        this.router.post('/reset-password', auth_controller_1.default.resetPassword);
    }
    patchRoutes() {
    }
}
exports.default = new AuthRoutes().router;
