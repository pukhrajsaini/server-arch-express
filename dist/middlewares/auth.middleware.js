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
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const jwt_util_1 = require("../utils/jwt.util");
const token_model_1 = require("../models/token.model");
const user_model_1 = require("../models/user.model");
const admin_model_1 = require("../models/admin.model");
const api_constant_1 = require("../apis/api.constant");
const role_model_1 = require("../models/role.model");
class AuthMiddleware {
    user(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                if (!token)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'unauthorized'
                    });
                const decoded = jwt_util_1.default.decodeJwt(token.split(' ')[1]);
                const { tid } = decoded;
                const tokenData = yield token_model_1.default.findOne({ _id: tid });
                console.log('tokenData', tokenData);
                if (!tokenData || !tokenData.isActive)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'unauthorized'
                    });
                const user = yield user_model_1.default.findOne({ _id: tokenData.userId });
                if (!user)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'unauthorized'
                    });
                if (!user.isActive)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'user_inactive'
                    });
                if (user.isDelete)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'user_does_not_exist'
                    });
                req.user = user;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    admin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                if (!token)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'unauthorized'
                    });
                const decoded = jwt_util_1.default.decodeJwt(token.split(' ')[1]);
                const { tid } = decoded;
                const tokenData = yield token_model_1.default.findOne({ _id: tid });
                if (!tokenData || !tokenData.isActive)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'unauthorized'
                    });
                if (!tokenData.adminId)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'unauthorized'
                    });
                const apiMetadata = req.metadata;
                if (![api_constant_1.ApiAccess.Admin, api_constant_1.ApiAccess.Global].includes(apiMetadata.access))
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'not_permitted'
                    });
                const admin = yield admin_model_1.default.findOne({ _id: tokenData.adminId });
                if (!admin)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'unauthorized'
                    });
                if (!admin.isActive)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'admin_inactive'
                    });
                if (admin.isDeleted)
                    return (0, helpers_1.sendResponse)(res, {
                        status: constants_1.HttpStatus.Unauthorized,
                        message: 'admin_does_not_exist'
                    });
                if (apiMetadata.access === api_constant_1.ApiAccess.Global) {
                    req.admin = admin;
                    next();
                }
                else {
                    const role = yield role_model_1.default.findOne({ _id: admin.roleId });
                    if (!role.permissions.includes(apiMetadata.module))
                        return (0, helpers_1.sendResponse)(res, {
                            status: constants_1.HttpStatus.Unauthorized,
                            message: 'not_permitted'
                        });
                    req.admin = admin;
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
const authenticate = new AuthMiddleware();
exports.default = authenticate;
