"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const individual_user_controller_1 = require("../../controllers/admin/individual.user.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const individualuser_validator_1 = require("../../validators/admin/individualuser.validator");
class IndividualUserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.post('/add', authentication_middleware_1.default.admin, individualuser_validator_1.default.addindividualUser, individual_user_controller_1.default.add);
    }
    getRoutes() {
        this.router.get('/list', authentication_middleware_1.default.admin, individual_user_controller_1.default.list);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', authentication_middleware_1.default.admin, individualuser_validator_1.default.editindividualUser, individual_user_controller_1.default.update);
    }
}
exports.default = new IndividualUserRoutes().router;
