"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const api_metadata_middleware_1 = require("../../../middlewares/api-metadata.middleware");
const role_constant_1 = require("../role/role.constant");
const api_constant_1 = require("../../api.constant");
const restaurant_validator_1 = require("./restaurant.validator");
const restaurant_controller_1 = require("./restaurant.controller");
class RestaurantRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post('', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.Restaurant,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Create
        }), auth_middleware_1.default.admin, restaurant_validator_1.default.create, restaurant_controller_1.default.create);
        this.router.get('', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.Restaurant,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.admin, restaurant_controller_1.default.list);
        this.router.get('/resturantsByUser', auth_middleware_1.default.user, restaurant_controller_1.default.resturantListByUser);
        this.router.get('/:id', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.Restaurant,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.admin, restaurant_controller_1.default.details);
        this.router.delete('/:id', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.Restaurant,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Delete
        }), auth_middleware_1.default.admin, restaurant_controller_1.default.delete);
    }
}
exports.default = new RestaurantRoutes().router;
