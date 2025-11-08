"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./auth/auth.route");
const user_route_1 = require("./user/user.route");
const oven_route_1 = require("./oven/oven.route");
const admin_route_1 = require("./admin/admin.route");
const restaurant_route_1 = require("./restaurant/restaurant.route");
const device_route_1 = require("./device/device.route");
class V1Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use('/users', user_route_1.default);
        this.router.use('/auth', auth_route_1.default);
        this.router.use('/oven', oven_route_1.default);
        this.router.use('/admins', admin_route_1.default);
        this.router.use('/restaurants', restaurant_route_1.default);
        this.router.use('/devices', device_route_1.default);
    }
}
exports.default = new V1Routes().router;
