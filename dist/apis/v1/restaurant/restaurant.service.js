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
const utils_1 = require("../../../utils");
const user_model_1 = require("../../../models/user.model");
const restaurant_model_1 = require("../../../models/restaurant.model");
const constants_1 = require("../../../constants");
const mongoose_1 = require("mongoose");
class RestaurantService {
    create(payload, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const displayId = utils_1.OpenId.generate(6, 'R');
            const administratorsIds = [];
            for (const user of payload.administrators) {
                let existingUser = yield user_model_1.default.findOne({
                    countryCode: user.countryCode,
                    phoneNumber: user.phoneNumber
                });
                if (!existingUser) {
                    existingUser = yield user_model_1.default.create(Object.assign(Object.assign({}, user), { userType: user_model_1.UserType.Administrator }));
                }
                administratorsIds.push(existingUser._id);
            }
            let owner = yield user_model_1.default.findOne({
                countryCode: payload.owner.countryCode,
                phoneNumber: payload.owner.phoneNumber
            });
            if (!owner) {
                owner = yield user_model_1.default.create(Object.assign(Object.assign({}, payload.owner), { userType: user_model_1.UserType.Owner }));
            }
            const restaurant = yield restaurant_model_1.RestaurantModel.create({
                name: payload.name,
                displayId,
                streetNumber: payload.streetNumber,
                streetName: payload.streetName,
                city: payload.city,
                postalCode: payload.postalCode,
                createdBy: admin._id,
                administratorIds: administratorsIds,
                ownerId: owner._id,
            });
            return {
                status: constants_1.HttpStatus.Created,
                message: "restaurant_created",
                data: {
                    _id: restaurant._id,
                    name: restaurant.name,
                    displayId: restaurant.displayId,
                }
            };
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const result = yield restaurant_model_1.RestaurantModel.aggregate([
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
                                    from: constants_1.DB_MODELS.USER,
                                    localField: 'ownerId',
                                    foreignField: '_id',
                                    as: 'owner'
                                }
                            },
                            {
                                $set: {
                                    owner: { $first: '$owner' },
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    displayId: 1,
                                    name: 1,
                                    owner: {
                                        name: 1,
                                        phoneNumber: 1,
                                        countryCode: 1
                                    },
                                    streetNumber: 1,
                                    streetName: 1,
                                    city: 1,
                                    postalCode: 1,
                                    createdAt: 1,
                                    updatedAt: 1
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
    details(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [
                {
                    $match: {
                        isDeleted: false,
                        _id: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: constants_1.DB_MODELS.USER,
                        localField: 'ownerId',
                        foreignField: '_id',
                        as: 'owner'
                    }
                },
                {
                    $lookup: {
                        from: constants_1.DB_MODELS.USER,
                        let: {
                            aids: '$administratorIds'
                        },
                        as: 'administrators',
                        pipeline: [
                            {
                                $match: {
                                    isDeleted: false,
                                    userType: user_model_1.UserType.Administrator,
                                    $expr: {
                                        $in: [
                                            '$_id',
                                            '$$aids'
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    phoneNumber: 1,
                                    countryCode: 1,
                                    email: 1,
                                    userType: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: constants_1.DB_MODELS.DEVICE,
                        let: {
                            rid: '$_id'
                        },
                        as: 'devices',
                        pipeline: [
                            {
                                $match: {
                                    isDeleted: false,
                                    $expr: {
                                        $eq: [
                                            '$restaurantId',
                                            '$$rid'
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    hwVersion: 1,
                                    swVersion: 1,
                                    btLoaderVersion: 1,
                                    serialNumber: 1,
                                    notes: 1,
                                }
                            }
                        ]
                    }
                },
                {
                    $set: {
                        owner: { $first: '$owner' },
                    }
                },
                {
                    $project: {
                        _id: 1,
                        displayId: 1,
                        name: 1,
                        owner: {
                            name: 1,
                            phoneNumber: 1,
                            countryCode: 1
                        },
                        streetNumber: 1,
                        streetName: 1,
                        city: 1,
                        postalCode: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        devices: 1,
                        administrators: 1
                    }
                }
            ];
            const result = yield restaurant_model_1.RestaurantModel.aggregate(query);
            if (!result.length)
                return {
                    status: constants_1.HttpStatus.BadRequest,
                    message: 'invalid_restaurant_id'
                };
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'restaurant_details',
                data: result[0]
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield restaurant_model_1.RestaurantModel.findById(id);
            if (!restaurant)
                return {
                    status: constants_1.HttpStatus.BadRequest,
                    message: 'invalid_restaurant_id'
                };
            yield restaurant_model_1.RestaurantModel.updateOne({ _id: id }, { isDeleted: true });
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'restaurant_deleted'
            };
        });
    }
    resturantListByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield restaurant_model_1.RestaurantModel.find({ ownerId: id });
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'restaurant_list',
                data: result
            };
        });
    }
}
exports.default = new RestaurantService();
