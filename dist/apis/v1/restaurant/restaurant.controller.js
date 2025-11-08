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
const restaurant_service_1 = require("./restaurant.service");
const helpers_1 = require("../../../helpers");
class RestaurantController {
    /**
     * @api {post} /restaurants Create restaurant by admin
     * @apiName create-restaurant
     * @apiGroup Restaurant
     * @apiDescription create restaurant api
     * @apiHeader {String} Authorization Admin's access token
     *
     * @apiBody {String} name Restaurant name
     * @apiBody {Array} administrators List of administrators
     * @apiBody {Object} administrator Administrator object
     * @apiBody {String} administrator.name Administrator name
     * @apiBody {String} administrator.countryCode Administrator country code
     * @apiBody {String} administrator.phoneNumber Administrator phone number
     * @apiBody {Object} owner Restaurant owner
     * @apiBody {String} owner.name Owner name
     * @apiBody {String} owner.countryCode Owner country code
     * @apiBody {String} owner.phoneNumber Owner phone number
     * @apiBody {String} streetNumber Restaurant street number
     * @apiBody {String} streetName Restaurant street name
     * @apiBody {String} city Restaurant city
     * @apiBody {String} postalCode Restaurant postal code
     *
     * @apiExample {json} Request-Example:
     *     {
     *       "name": "John Doe",
     *       "administrators": [
     *         {
     *           "name": "Dog Doe",
     *           "countryCode": "+91",
     *           "phoneNumber": "9882557777"
     *         },
     *         {
     *           "name": "jai Smith",
     *           "countryCode": "+91",
     *           "phoneNumber": "9882558888"
     *         }
     *       ],
     *       "owner": {
     *         "name": "shyam lal",
     *         "countryCode": "+91",
     *         "phoneNumber": "9882559999"
     *       },
     *       "streetNumber": "123",
     *       "streetName": "Main St",
     *       "city": "Noida",
     *       "postalCode": "321609"
     *     }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 CREATED
     *     {
     *           "status": 201,
     *           "message": "Restaurant created successfully",
     *           "data": {
     *               "_id": "67ab4b5f79801fce0bee8260",
     *               "name": "John Doe",
     *               "displayId": "R-7O96QB"
     *           }
     *      }
    **/
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const result = yield restaurant_service_1.default.create(body, req.admin);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {get} /restaurants Get list of restaurants
     * @apiName list-restaurant
     * @apiGroup Restaurant
     * @apiDescription get list of restaurants by admin
     * @apiHeader {String} Authorization Admin's access token
     *
     * @apiQuery {Number} page Page number
     * @apiQuery {Number} limit Limit number
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "status": 200,
     *           "message": "Admins list",
     *           "data": {
     *               "page": 1,
     *               "limit": 10,
     *               "list": [
     *                   {
     *                       "_id": "67acc751e43d54abf88e115a",
     *                       "name": "John Doe",
     *                       "displayId": "R-TZ2QVQ",
     *                       "streetNumber": "123",
     *                       "streetName": "Main St",
     *                       "city": "Noida",
     *                       "postalCode": "321609",
     *                       "createdAt": "2025-02-12T16:07:45.854Z",
     *                       "updatedAt": "2025-02-12T16:07:45.854Z",
     *                       "owner": {
     *                           "name": "shyam lal",
     *                           "phoneNumber": "9882559999",
     *                           "countryCode": "+91"
     *                       }
     *                   }
     *               ],
     *               "count": 2
     *           }
     *       }
    ***/
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield restaurant_service_1.default.list(req.query);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {get} /restaurants/:id Get details of a restaurant by admin
     * @apiName details-restaurant
     * @apiGroup Restaurant
     * @apiDescription get details of a restaurant by admin
     * @apiHeader {String} Authorization Admin's access token
     *
     * @apiParam {String} id Restaurant's _id
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
    *       "status": 200,
    *       "message": "Restaurant details",
    *       "data": {
    *           "_id": "67acc751e43d54abf88e115a",
    *           "name": "John Doe",
    *           "displayId": "R-TZ2QVQ",
    *           "streetNumber": "123",
    *           "streetName": "Main St",
    *           "city": "Noida",
    *           "postalCode": "321609",
    *           "createdAt": "2025-02-12T16:07:45.854Z",
    *           "updatedAt": "2025-02-12T16:07:45.854Z",
    *           "owner": {
    *               "name": "shyam lal",
    *               "phoneNumber": "9882559999",
    *               "countryCode": "+91"
    *           },
    *           "administrators": [
    *               {
    *                   "_id": "67ab73f42c90769d2862d9ea",
    *                   "name": "dog doe",
    *                   "phoneNumber": "9882557777",
    *                   "countryCode": "+91",
    *                   "userType": "ADMINISTRATOR"
    *               },
    *               {
    *                   "_id": "67ab73f42c90769d2862d9ed",
    *                   "name": "jai smith",
    *                   "phoneNumber": "9882558888",
    *                   "countryCode": "+91",
    *                   "userType": "ADMINISTRATOR"
    *               }
    *           ],
    *           "devices": [
    *               {
    *                   "_id": "67ab6e30e29d04c7544f71b5",
    *                   "name": "My Device",
    *                   "serialNumber": "SN-123456",
    *                   "hwVersion": "1.0.0",
    *                   "swVersion": "2.0.0",
    *                   "btLoaderVersion": "3.0.0",
    *                   "notes": "This is a test device"
    *               }
    *           ]
    *       }
    *   }
    */
    details(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield restaurant_service_1.default.details(req.params.id);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {delete} /restaurants/:id Delete a restaurant by admin
     * @apiName delete-restaurant
     * @apiGroup Restaurant
     * @apiDescription Delete a restaurant by admin
     * @apiHeader {String} Bearer Authorization Admin's access token
     *
     * @apiParam {String} id Restaurant's _id
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
    *       "status": 200,
    *       "message": "Restaurant deleted successfully",
    *   }
    */
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield restaurant_service_1.default.delete(id);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
         * @api {get} /restaurants/resturantsByUser Get list of a restaurant allocated to user
         * @apiName allocated-restaurant-to-user
         * @apiGroup Restaurant
         * @apiDescription Get list of a restaurant allocated to user
         * @apiHeader {String} Authorization Admin's access token
         *
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         * {
        "status": 200,
        "message": "restaurant_list",
        "data": [
            {
                "_id": "6820d87358af1e0f0769cbbf",
                "name": "Bikanare",
                "displayId": "R-3AZ7KD",
                "streetNumber": "30",
                "streetName": "Signature Street",
                "city": "GHAZIABAD",
                "postalCode": "201013",
                "createdBy": "680d27d948ee9484647f1be0",
                "administratorIds": [
                    "6820d87358af1e0f0769cbba"
                ],
                "ownerId": "6820d87358af1e0f0769cbbd",
                "isDeleted": false,
                "isActive": true,
                "createdAt": "2025-05-11T17:03:47.593Z",
                "updatedAt": "2025-05-11T17:03:47.593Z",
                "__v": 0
            },
            {
                "_id": "6820d8f258af1e0f0769cbc6",
                "name": "Bikanare",
                "displayId": "R-O3UGVQ",
                "streetNumber": "30",
                "streetName": "Signature Street",
                "city": "GHAZIABAD",
                "postalCode": "201013",
                "createdBy": "680d27d948ee9484647f1be0",
                "administratorIds": [
                    "6820d87358af1e0f0769cbba"
                ],
                "ownerId": "6820d87358af1e0f0769cbbd",
                "isDeleted": true,
                "isActive": true,
                "createdAt": "2025-05-11T17:05:54.484Z",
                "updatedAt": "2025-05-15T08:52:15.485Z",
                "__v": 0
            }
        ]
    }
        */
    resturantListByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log('req', req);
                let id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
                const result = yield restaurant_service_1.default.resturantListByUser(id);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new RestaurantController();
