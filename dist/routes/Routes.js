"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRoutes_1 = require("./admin/AuthRoutes");
const AuthRouter_1 = require("./app/AuthRouter");
const UserRoutes_1 = require("./admin/UserRoutes");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.app();
        this.admin();
    }
    app() {
        this.router.use('/app/auth', AuthRouter_1.default);
    }
    admin() {
        this.router.use('/admin/auth', AuthRoutes_1.default);
        this.router.use('/admin/user', UserRoutes_1.default);
    }
}
exports.default = new Routes().router;
