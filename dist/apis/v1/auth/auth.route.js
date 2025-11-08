"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validator_1 = require("./auth.validator");
const auth_controller_1 = require("./auth.controller");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post('/login', auth_validator_1.default.login, auth_controller_1.default.adminLogin);
        this.router.post('/send-otp', auth_validator_1.default.sendOtpLogin, auth_controller_1.default.sendOtpLogin);
        this.router.post('/verify-otp', auth_validator_1.default.verifyOtpLogin, auth_controller_1.default.verifyOtpLogin);
    }
}
exports.default = new AuthRoutes().router;
