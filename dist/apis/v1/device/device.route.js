"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const api_metadata_middleware_1 = require("../../../middlewares/api-metadata.middleware");
const role_constant_1 = require("../role/role.constant");
const api_constant_1 = require("../../api.constant");
const device_validator_1 = require("./device.validator");
const device_controller_1 = require("./device.controller");
class DeviceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post('/', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Create
        }), auth_middleware_1.default.admin, device_validator_1.default.create, device_controller_1.default.create);
        this.router.post('/assign', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Update
        }), auth_middleware_1.default.admin, device_validator_1.default.assign, device_controller_1.default.assign);
        this.router.get('/', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.admin, device_controller_1.default.list);
        this.router.get('/:id', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.admin, device_controller_1.default.details);
        this.router.get('/restaurant/:id', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.User,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.user, device_controller_1.default.details);
        this.router.get('/drop-down-list/:restaurantId', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.User,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.user, device_controller_1.default.dropDownListByRestaurant);
        this.router.get('/get-device-by-id/:deviceId', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.User,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.user, device_controller_1.default.deviceData);
        this.router.get('/get-device-by-id/:deviceId', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.user, device_controller_1.default.deviceData);
        this.router.delete('/:id', (0, api_metadata_middleware_1.setApiMetadata)({
            module: role_constant_1.AppModules.DeviceManagement,
            access: api_constant_1.ApiAccess.Admin,
            actions: role_constant_1.ApiActions.Delete
        }), auth_middleware_1.default.admin, device_controller_1.default.delete);
    }
}
exports.default = new DeviceRoutes().router;
