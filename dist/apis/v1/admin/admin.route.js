"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_metadata_middleware_1 = require("../../../middlewares/api-metadata.middleware");
const api_constant_1 = require("../../api.constant");
const role_constant_1 = require("../role/role.constant");
const admin_controller_1 = require("./admin.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const admin_validator_1 = require("./admin.validator");
class AdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', (0, api_metadata_middleware_1.setApiMetadata)({
            access: api_constant_1.ApiAccess.Admin,
            module: role_constant_1.AppModules.Admin,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.admin, admin_controller_1.default.list);
        this.router.get('/profile', (0, api_metadata_middleware_1.setApiMetadata)({
            access: api_constant_1.ApiAccess.Global,
            module: role_constant_1.AppModules.Admin,
            actions: role_constant_1.ApiActions.Read
        }), auth_middleware_1.default.admin, admin_controller_1.default.myProfile);
        this.router.post('', (0, api_metadata_middleware_1.setApiMetadata)({
            access: api_constant_1.ApiAccess.Admin,
            module: role_constant_1.AppModules.Admin,
            actions: role_constant_1.ApiActions.Create
        }), auth_middleware_1.default.admin, admin_validator_1.default.create, admin_controller_1.default.create);
        this.router.post('/change-password', (0, api_metadata_middleware_1.setApiMetadata)({
            access: api_constant_1.ApiAccess.Admin,
            module: role_constant_1.AppModules.Settings,
            actions: role_constant_1.ApiActions.Update
        }), auth_middleware_1.default.admin, admin_validator_1.default.changePassword, admin_controller_1.default.changePassword);
        this.router.delete('/:id', (0, api_metadata_middleware_1.setApiMetadata)({
            access: api_constant_1.ApiAccess.Admin,
            module: role_constant_1.AppModules.Admin,
            actions: role_constant_1.ApiActions.Delete
        }), auth_middleware_1.default.admin, admin_controller_1.default.delete);
    }
}
exports.default = new AdminRoutes().router;
