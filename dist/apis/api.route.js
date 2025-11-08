"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_route_1 = require("./v1/v1.route");
class ApiRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.use('/v1', v1_route_1.default);
    }
}
exports.default = new ApiRoutes().router;
