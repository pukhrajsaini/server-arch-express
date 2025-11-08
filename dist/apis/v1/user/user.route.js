"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validator_1 = require("./user.validator");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/profile', auth_middleware_1.default.user, user_controller_1.default.getProfile);
        this.router.put('/profile', auth_middleware_1.default.user, user_validator_1.default.updateProfile, user_controller_1.default.updateProfile);
    }
}
exports.default = new UserRoutes().router;
