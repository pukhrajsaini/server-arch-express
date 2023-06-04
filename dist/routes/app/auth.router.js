"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/app/auth.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const auth_validator_1 = require("../../validators/app/auth.validator");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.post('/signUp', auth_validator_1.default.signUp, auth_controller_1.default.SignUp);
        this.router.post('/verify-otp', auth_controller_1.default.OtpVerify);
        this.router.post('/resend-otp', auth_controller_1.default.ResendOtp);
        this.router.post('/login', 
        // Authentication.user,
        auth_validator_1.default.login, auth_controller_1.default.login);
        this.router.post('/register', authentication_middleware_1.default.user, auth_validator_1.default.register, auth_controller_1.default.Register);
    }
    patchRoutes() {
    }
}
exports.default = new AuthRoutes().router;
