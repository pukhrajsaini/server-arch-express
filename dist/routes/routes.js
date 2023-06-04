"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./admin/auth.routes");
const individual_user_routes_1 = require("./admin/individual-user.routes");
const item_routes_1 = require("./admin/item.routes");
const user_routes_1 = require("./admin/user.routes");
const auth_router_1 = require("./app/auth.router");
const item_router_1 = require("./app/item.router");
const user_router_1 = require("./app/user.router");
const location_routes_1 = require("./admin/location.routes");
const location_router_1 = require("./app/location.router");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.app();
        this.admin();
    }
    app() {
        this.router.use('/app/auth', auth_router_1.default);
        this.router.use('/app/item', item_router_1.default);
        this.router.use('/app/user', user_router_1.default);
        this.router.use('/app/location', location_router_1.default);
    }
    admin() {
        this.router.use('/admin/auth', auth_routes_1.default);
        this.router.use('/admin/user', user_routes_1.default);
        this.router.use('/admin/individualuser', individual_user_routes_1.default);
        this.router.use('/admin/item', item_routes_1.default);
        this.router.use('/admin/location', location_routes_1.default);
    }
}
exports.default = new Routes().router;
