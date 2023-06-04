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
const item_model_1 = require("../../models/item.model");
const mongoose_1 = require("mongoose");
const moved_item_model_1 = require("../../models/moved-item.model");
const moved_item_interface_1 = require("../../interfaces/moved-item.interface");
class UserItemService {
    list(borrowerId, queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = queryString.limit * 1 || 20;
            const page = queryString.page * 1 || 1;
            const skip = (page - 1) * limit;
            const match = {
                'borrowerId': new mongoose_1.Types.ObjectId(borrowerId)
            };
            if (queryString.movingStatus && queryString.movingStatus * 1 === 2) {
                return yield this.movingItemList(skip, limit, {
                    userId: borrowerId,
                    movingStatus: moved_item_interface_1.MovedItemStatus.moving
                });
            }
            if (queryString.movingStatus)
                match.movingStatus = queryString.movingStatus * 1;
            const pipeline = [
                {
                    '$match': match
                },
                {
                    '$facet': {
                        'count': [
                            {
                                '$count': 'count'
                            }
                        ],
                        'list': [
                            {
                                '$skip': skip
                            },
                            {
                                '$limit': limit
                            },
                            {
                                '$lookup': {
                                    'from': 'users',
                                    'localField': 'borrowerId',
                                    'foreignField': '_id',
                                    'as': 'borrower'
                                }
                            }, {
                                '$unwind': {
                                    'path': '$borrower',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'itemName': 1,
                                    'itemOwner': 1,
                                    'ownerName': 1,
                                    'loanerName': 1,
                                    'consignmentName': 1,
                                    'itemId': 1,
                                    'baseLocation': 1,
                                    'brand': 1,
                                    'type': 1,
                                    'images': 1,
                                    'isApproved': 1,
                                    'borrowerId': 1,
                                    'movingStatus': 1,
                                    'pdf': 1,
                                    'createdAt': 1,
                                    'updatedAt': 1,
                                    'custom1': 1,
                                    'custom2': 1,
                                    'borrower': {
                                        '_id': 1,
                                        'name': 1
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    '$project': {
                        'count': {
                            '$first': '$count.count'
                        },
                        'list': 1
                    }
                }
            ];
            let list = [];
            let count = 0;
            const itemData = yield item_model_1.default.aggregate(pipeline);
            if (itemData.length) {
                list = itemData[0].list;
                count = itemData[0].count;
            }
            return { count, list };
        });
    }
    movingItemList(skip, limit, match) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    '$match': match
                },
                {
                    '$facet': {
                        'count': [
                            {
                                '$count': 'count'
                            }
                        ],
                        'list': [
                            {
                                '$sort': {
                                    'createdAt': -1
                                }
                            },
                            {
                                '$skip': skip
                            },
                            {
                                '$limit': limit
                            },
                            {
                                '$project': {
                                    'location': 1,
                                    'item': 1
                                }
                            }
                        ]
                    }
                },
                {
                    '$project': {
                        'count': {
                            '$first': '$count.count'
                        },
                        'list': 1
                    }
                }
            ];
            let list = [];
            let count = 0;
            const itemData = yield moved_item_model_1.default.aggregate(pipeline);
            if (itemData.length) {
                list = itemData[0].list;
                count = itemData[0].count;
            }
            return { list: list.map((e) => e = Object.assign(Object.assign({}, e.item), { location: e.location })), count };
        });
    }
}
exports.default = new UserItemService();
