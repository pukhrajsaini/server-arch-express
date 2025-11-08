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
const mongoose_1 = require("mongoose");
const env_1 = require("../../../environment/env");
const admin_model_1 = require("../../../models/admin.model");
const role_model_1 = require("../../../models/role.model");
const utils_1 = require("../../../utils");
const password_util_1 = require("../../../utils/password.util");
const constants_1 = require("../../../constants");
class AdminService {
    constructor() {
        this.logger = new utils_1.LoggerUtil('AdminService');
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const email = env_1.default.ADMIN_EMAIL;
            const password = env_1.default.ADMIN_PASSWORD;
            const name = env_1.default.ADMIN_NAME;
            const encryptedPassword = yield password_util_1.default.encrypt(password);
            const isExists = yield admin_model_1.default.findOne({ email });
            if (isExists) {
                this.logger.log("Admin already exists");
            }
            else {
                const role = yield role_model_1.default.findOne({ name: 'SUPER_ADMIN' });
                yield admin_model_1.default.create({
                    email,
                    password: encryptedPassword,
                    name,
                    roleId: role._id
                });
                this.logger.log("Admin created");
            }
            return true;
        });
    }
    myProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'roles',
                        localField: 'roleId',
                        foreignField: '_id',
                        as: 'role'
                    }
                },
                {
                    $set: {
                        role: {
                            $first: '$role'
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        role: {
                            _id: 1,
                            name: 1,
                            permissions: 1
                        }
                    }
                }
            ]);
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'admin_profile_fetched',
                data: {
                    admin
                }
            };
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, countryCode, phoneNumber, roleName } = payload;
            let isExists = yield admin_model_1.default.findOne({ email });
            if (isExists)
                return { status: constants_1.HttpStatus.BadRequest, message: 'admin_already_exists' };
            if (countryCode && phoneNumber) {
                isExists = yield admin_model_1.default.findOne({ countryCode, phone: phoneNumber });
                if (isExists)
                    return { status: constants_1.HttpStatus.BadRequest, message: 'admin_already_exists' };
            }
            const password = utils_1.OpenId.password();
            const encryptedPassword = yield password_util_1.default.encrypt(password);
            const role = yield role_model_1.default.findOne({ name: roleName });
            if (!role)
                return { status: constants_1.HttpStatus.BadRequest, message: 'invalid_role_name' };
            const admin = yield admin_model_1.default.create({
                email,
                displayId: utils_1.OpenId.generate(6),
                password: encryptedPassword,
                name,
                countryCode,
                phone: phoneNumber,
                roleId: role._id
            });
            return {
                status: constants_1.HttpStatus.Created, message: 'admin_created', data: {
                    _id: admin._id,
                    displayId: admin.displayId
                }
            };
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const result = yield admin_model_1.default.aggregate([
                {
                    $match: {
                        isDeleted: false
                    }
                },
                {
                    $facet: {
                        count: [
                            { $count: 'count' }
                        ],
                        list: [
                            { $skip: skip },
                            { $limit: limit },
                            {
                                $lookup: {
                                    from: constants_1.DB_MODELS.ROLE,
                                    localField: 'roleId',
                                    foreignField: '_id',
                                    as: 'role'
                                }
                            },
                            {
                                $set: {
                                    role: {
                                        $first: '$role'
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    displayId: 1,
                                    name: 1,
                                    email: 1,
                                    countryCode: 1,
                                    phoneNumber: 1,
                                    createdAt: 1,
                                    role: {
                                        _id: 1,
                                        name: 1,
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        count: { $first: '$count.count' },
                        list: 1
                    }
                }
            ]);
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'admins_list',
                data: Object.assign({ page,
                    limit }, result[0])
            };
        });
    }
    delete(id, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExists = yield admin_model_1.default.findById(id);
            if (!isExists)
                return { status: constants_1.HttpStatus.BadRequest, message: 'admin_not_found' };
            if (admin._id.toString() === id)
                return { status: constants_1.HttpStatus.BadRequest, message: 'cannot_delete_yourself' };
            yield admin_model_1.default.findByIdAndUpdate(id, {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy: admin._id,
                name: '@D_name',
                email: `d_${new Date().getTime()}@deleted.com`,
                countryCode: '0000',
                phoneNumber: '0000000000',
                isActive: false
            });
            return { status: constants_1.HttpStatus.Ok, message: 'admin_deleted' };
        });
    }
    changePassword(payload, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword } = payload;
            const admin = yield admin_model_1.default.findById(adminId);
            const isMatch = yield password_util_1.default.compare(currentPassword, admin.password);
            if (!isMatch)
                return {
                    status: constants_1.HttpStatus.BadRequest,
                    message: 'invalid_password'
                };
            const encryptedPassword = yield password_util_1.default.encrypt(newPassword);
            yield admin_model_1.default.findByIdAndUpdate(adminId, { password: encryptedPassword });
            return { status: constants_1.HttpStatus.Ok, message: 'admin_password_changed' };
        });
    }
}
exports.default = new AdminService();
