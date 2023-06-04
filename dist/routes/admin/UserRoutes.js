"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../controllers/admin/UserController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/users', AuthenticationMiddleware_1.default.admin, UserController_1.default.userList);
    }
}
exports.default = new UserRoutes().router;
