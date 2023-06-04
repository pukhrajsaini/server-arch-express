"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const location_controller_1 = require("../../controllers/app/location.controller");
class LocationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
    }
    ;
    patchRoutes() {
    }
    ;
    getRoutes() {
        this.router.get('/location-list', authentication_middleware_1.default.user, location_controller_1.default.locationList);
    }
    ;
    deleteRoutes() {
    }
    ;
}
exports.default = new LocationRouter().router;
