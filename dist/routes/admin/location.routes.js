"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const location_validator_1 = require("../../validators/admin/location.validator");
const location_controller_1 = require("../../controllers/admin/location.controller");
class LocationRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post('/add-location', authentication_middleware_1.default.admin, location_validator_1.default.addLocation, location_controller_1.default.addLocation);
    }
    getRoutes() {
    }
    patchRoutes() {
    }
    deleteRoutes() {
    }
}
exports.default = new LocationRoutes().router;
