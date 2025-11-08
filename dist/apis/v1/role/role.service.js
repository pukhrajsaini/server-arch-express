"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const role_constant_1 = require("./role.constant");
const role_model_1 = require("../../../models/role.model");
const utils_1 = require("../../../utils");
const admin_service_1 = require("../admin/admin.service");
class RoleService {
    constructor() {
        this.logger = new utils_1.LoggerUtil('RoleService');
    }
    createRole() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const role of role_constant_1.ROLES) {
                yield role_model_1.default.findOneAndUpdate({
                    name: role.name
                }, {
                    name: role.name,
                    permissions: role.permissions
                }, {
                    upsert: true
                });
            }
            this.logger.log("Roles created");
            yield admin_service_1.default.createAdmin();
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'roles_fetched',
                data: {
                    roles: role_constant_1.ROLES
                }
            };
        });
    }
}
exports.default = new RoleService();
