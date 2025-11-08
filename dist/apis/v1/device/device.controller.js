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
const helpers_1 = require("../../../helpers");
const device_service_1 = require("./device.service");
class DeviceController {
    /**
    * @api {post} /devices Create device by admin
    * @apiName create-device
    * @apiGroup Device
    * @apiDescription create device api
    * @apiHeader {String} Authorization Admin's access token
    *
    * @apiBody {String} name Device name
    * @apiBody {String} hwVersion H W version of device
    * @apiBody {String} swVersion S W version of device
    * @apiBody {String} btLoaderVersion BTLoader version of device
    * @apiBody {String} serialNumber Serial number of device
    * @apiBody {String} [notes] some information about device
    *
    * @apiExample {json} Request-Example:
    *     {
    *       "id": "DEV-002",
    *       "hwVersion": "1.0.0",
    *       "swVersion": "2.0.0",
    *       "btLoaderVersion": "3.0.0",
    *       "name": "My Device",
    *       "serialNumber": "SN-123457",
    *       "notes": "This is a test device"
    *       }
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 201 CREATED
    *     {
    *       "status": 201,
    *       "message": "Device created successfully",
    *       "data": {
    *           "_id": "67ab6e911a5fd3aa3e5eef56",
    *           "name": "My Device",
    *           "displayId": "D-CH2TQ8",
    *           "id": "DEV-002"
    *       }
    *   }
    * @apiErrorExample {json} Error-Response:
    *     HTTP/1.1 400 BAD REQUEST
    * {
    *       "status": 400,
    *       "message": "Device already exists"
    *   }
   **/
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield device_service_1.default.create(req.body, req.admin);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     *
     * @api {get} /devices List devices by admin
     * @apiName list-devices
     * @apiGroup Device
     * @apiDescription list devices api by admin
     * @apiHeader {String} Authorization Admin's access token
     *
     * @apiParam {number} [page=1] Page number
     * @apiParam {number} [limit=10] Limit number
     * @apiParam {isAssigned} [isAssigned=false] Boolean value to check whether device is assigned to a restaurant or not
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
                "status": 200,
                "message": "Devices list",
                "data": {
                    "page": 1,
                    "limit": 10,
                    "list": [
                        {
                            "_id": "67ab6e30e29d04c7544f71b5",
                            "name": "My Device",
                            "displayId": "D-RJIJ4D",
                            "id": "DEV-001",
                            "serialNumber": "SN-123456",
                            "hwVersion": "1.0.0",
                            "swVersion": "2.0.0",
                            "btLoaderVersion": "3.0.0",
                            "createdAt": "2025-02-11T15:35:12.213Z",
                            "updatedAt": "2025-02-11T15:35:12.213Z"
                        }
                    ],
                    "count": 2
                }
            }
     */
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield device_service_1.default.list(req.query);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {get} /devices/:id Details of device by admin
     * @apiName details-device
     * @apiGroup Device
     * @apiDescription details of device api by admin
     * @apiHeader {String} Authorization Admin's access token
     *
     * @apiParam {String} id Device's _id
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": 200,
     *       "message": "Device details",
     *       "data": {
     *           "_id": "67ab6e30e29d04c7544f71b5",
     *           "name": "My Device",
     *           "displayId": "D-RJIJ4D",
     *           "id": "DEV-001",
     *           "serialNumber": "SN-123456",
     *           "hwVersion": "1.0.0",
     *           "swVersion": "2.0.0",
     *           "btLoaderVersion": "3.0.0",
     *           "createdAt": "2025-02-11T15:35:12.213Z",
     *           "updatedAt": "2025-02-11T15:35:12.213Z"
     *       }
     *   }
     *
     * @apiSuccessExample {json} Success-Response 2:
     *     HTTP/1.1 200 OK
     *   {
     *       "status": 200,
     *       "message": "Device details",
     *       "data": {
     *           "_id": "67ab6e30e29d04c7544f71b5",
     *           "name": "My Device",
     *           "displayId": "D-RJIJ4D",
     *           "id": "DEV-001",
     *           "serialNumber": "SN-123456",
     *           "hwVersion": "1.0.0",
     *           "swVersion": "2.0.0",
     *           "btLoaderVersion": "3.0.0",
     *           "notes": "This is a test device",
     *           "createdBy": "67a39b456bc9ae04ccb0c807",
     *           "isActive": true,
     *           "createdAt": "2025-02-11T15:35:12.213Z",
     *           "updatedAt": "2025-02-15T14:24:39.297Z",
     *           "assignedBy": "67a39b456bc9ae04ccb0c807",
     *           "restaurantId": "67acc751e43d54abf88e115a",
     *           "restaurant": {
     *               "_id": "67acc751e43d54abf88e115a",
     *               "name": "John Doe",
     *               "streetNumber": "123",
     *               "streetName": "Main St",
     *               "city": "Noida",
     *               "postalCode": "321609"
     *           }
     *       }
     *   }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 BAD REQUEST
     * {
     *       "status": 400,
     *       "message": "Invalid device id"
     *   }
    **/
    /**
     * @api {get} /devices/restaurant/:id Details of device by restaurant
     * @apiName details-restaurant-device
     * @apiGroup Device
     * @apiDescription details of device api by resturant
     * @apiHeader {String} Authorization Users's access token
     *
     * @apiParam {String} id Device's _id
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": 200,
     *       "message": "Device details",
     *       "data": {
     *           "_id": "67ab6e30e29d04c7544f71b5",
     *           "name": "My Device",
     *           "displayId": "D-RJIJ4D",
     *           "id": "DEV-001",
     *           "serialNumber": "SN-123456",
     *           "hwVersion": "1.0.0",
     *           "swVersion": "2.0.0",
     *           "btLoaderVersion": "3.0.0",
     *           "createdAt": "2025-02-11T15:35:12.213Z",
     *           "updatedAt": "2025-02-11T15:35:12.213Z"
     *       }
     *   }
     *
     * @apiSuccessExample {json} Success-Response 2:
     *     HTTP/1.1 200 OK
     *   {
     *       "status": 200,
     *       "message": "Device details",
     *       "data": {
     *           "_id": "67ab6e30e29d04c7544f71b5",
     *           "name": "My Device",
     *           "displayId": "D-RJIJ4D",
     *           "id": "DEV-001",
     *           "serialNumber": "SN-123456",
     *           "hwVersion": "1.0.0",
     *           "swVersion": "2.0.0",
     *           "btLoaderVersion": "3.0.0",
     *           "notes": "This is a test device",
     *           "createdBy": "67a39b456bc9ae04ccb0c807",
     *           "isActive": true,
     *           "createdAt": "2025-02-11T15:35:12.213Z",
     *           "updatedAt": "2025-02-15T14:24:39.297Z",
     *           "assignedBy": "67a39b456bc9ae04ccb0c807",
     *           "restaurantId": "67acc751e43d54abf88e115a",
     *           "restaurant": {
     *               "_id": "67acc751e43d54abf88e115a",
     *               "name": "John Doe",
     *               "streetNumber": "123",
     *               "streetName": "Main St",
     *               "city": "Noida",
     *               "postalCode": "321609"
     *           }
     *       }
     *   }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 BAD REQUEST
     * {
     *       "status": 400,
     *       "message": "Invalid device id"
     *   }
    **/
    details(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield device_service_1.default.details(req.params.id);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {post} /devices/assign Assign device to a restaurant by admin
     * @apiName assign-device
     * @apiGroup Device
     * @apiDescription assign device to a restaurant api by admin
     * @apiHeader {String} Authorization Admin's access token
     *
     * @apiBody {String} deviceId Device's _id
     * @apiBody {String} restaurantId Restaurant's _id
     * @apiBody {Boolean} isAssigned Boolean value to check whether device is assigned/designed to a Restaurant's name
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": 200,
     *       "message": "Device assigned successfully",
     *   }
     * @apiSuccessExample {json} Success-Response 2:
     * {
     *      "status": 200,
     *      "message": "Device unassigned successfully"
     *  }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 BAD REQUEST
     * {
     *       "status": 400,
     *       "message": "Invalid device id"
     *   }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 409 CONFLICT
     * {
     *       "status": 409,
     *       "message": "Device already assigned"
     *   }
    **/
    assign(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const result = yield device_service_1.default.assign(payload, req.admin);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {delete} /devices/:id Delete device by admin
     * @apiName delete-device
     * @apiGroup Device
     * @apiDescription delete device api
     * @apiHeader {String} Authorization Admin's access token
     *
     * @apiParam {String} id Device's _id
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": 200,
     *       "message": "Device deleted successfully",
     *   }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 BAD REQUEST
     * {
     *       "status": 400,
     *       "message": "Invalid device id"
     *   }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 409 CONFLICT
     * {
            "status": 409,
            "message": "Cannot delete assigned device"
        }
    **/
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield device_service_1.default.delete(id);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     *
     * @api {get} /devices/drop-down-list/:restaurantId List devices by restaurant
     * @apiName drop-down-list
     * @apiGroup Device
     * @apiDescription list devices api by restaurant
     * @apiHeader {String} Authorization User's access token
     *
     * @apiParam {String} restaurantId Restaurant's _id
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
    "status": 200,
    "message": "restaurant_devices",
    "data": [
        {
            "_id": "6821c0f108bc4f81d83cf36e",
            "name": "Device 1",
            "displayId": "D-5ID6M5",
            "id": "Dev-1",
            "serialNumber": "SN-1",
            "hwVersion": "2.2",
            "swVersion": "SQT",
            "btLoaderVersion": "hds",
            "createdAt": "2025-05-12T09:35:45.802Z",
            "updatedAt": "2025-05-12T18:18:34.126Z"
        },
        {
            "_id": "68223df02a0201130bd5ae5c",
            "name": "OVEN-R1",
            "displayId": "D-TVWF0G",
            "id": "DEV-4",
            "serialNumber": "SWRX-1",
            "hwVersion": "2.43",
            "swVersion": "5.0",
            "btLoaderVersion": "2.0",
            "createdAt": "2025-05-12T18:29:04.634Z",
            "updatedAt": "2025-05-12T18:29:53.645Z"
        },
        {
            "_id": "68233153daea44121a530f64",
            "name": "Device11",
            "displayId": "D-PNFS5F",
            "id": "DEV-101",
            "serialNumber": "Sn-1r",
            "hwVersion": "3.4hbh",
            "swVersion": "3.6vhg",
            "btLoaderVersion": "4.5gcf",
            "createdAt": "2025-05-13T11:47:31.964Z",
            "updatedAt": "2025-05-13T11:47:45.996Z"
        },
        {
            "_id": "682333affa26c09d42636432",
            "name": "Device120",
            "displayId": "D-B16X87",
            "id": "Dev-12",
            "serialNumber": "SNW-4",
            "hwVersion": "1.2",
            "swVersion": "1.6",
            "btLoaderVersion": "1.3",
            "createdAt": "2025-05-13T11:57:35.740Z",
            "updatedAt": "2025-05-13T11:57:59.116Z"
        },
        {
            "_id": "682335b3fa26c09d42636512",
            "name": "cen",
            "displayId": "D-0JYKP1",
            "id": "DEV110",
            "serialNumber": "cjdbj",
            "hwVersion": "1.2",
            "swVersion": "1.4",
            "btLoaderVersion": "1.23",
            "createdAt": "2025-05-13T12:06:11.836Z",
            "updatedAt": "2025-05-13T12:06:23.814Z"
        },
        {
            "_id": "682588fc892eb266b810fd5a",
            "name": "DOV",
            "displayId": "D-L9NHEE",
            "id": "DEV-1011",
            "serialNumber": "SNN",
            "hwVersion": "4.5",
            "swVersion": "2.3",
            "btLoaderVersion": "5.4",
            "createdAt": "2025-05-15T06:26:04.760Z",
            "updatedAt": "2025-05-15T07:58:10.460Z"
        }
    ]
}
     */
    dropDownListByRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.params.restaurantId;
                const result = yield device_service_1.default.restaurantDevices(restaurantId);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {get} /devices/get-device-by-id/:deviceId  Device data by Id
     * @apiName get-device-by-id
     * @apiGroup Device
     * @apiDescription Device data by deviceId
     * @apiHeader {String} Authorization User's access token
     *
     * @apiParam {String} deviceId Device _id
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
    "status": 200,
    "message": "Device details",
    "data": {
        "_id": "6821c0f108bc4f81d83cf36e",
        "name": "Device 1",
        "displayId": "D-5ID6M5",
        "id": "Dev-1",
        "serialNumber": "SN-1",
        "hwVersion": "2.2",
        "swVersion": "SQT",
        "btLoaderVersion": "hds",
        "notes": "Add this ",
        "createdBy": "680d27d948ee9484647f1be0",
        "isActive": true,
        "createdAt": "2025-05-12T09:35:45.802Z",
        "updatedAt": "2025-05-12T18:18:34.126Z",
        "assignedBy": "680d27d948ee9484647f1be0",
        "restaurantId": "6820d87358af1e0f0769cbbf",
        "temperature": 821,
        "currentStatus": {
            "workStatus": {
                "raw": "04",
                "decimal": 4
            },
            "runAt": false,
            "alarmStatus": true,
            "emergencyKey": true,
            "switchOnOff": false,
            "cronoOn": true
        },
        "temperatures": {
            "cupola": {
                "raw": "0335",
                "decimal": 821
            },
            "platea": {
                "raw": "0282",
                "decimal": 642
            },
            "compExt": {
                "raw": "0000",
                "decimal": 0
            },
            "heatsink": {
                "raw": "50",
                "decimal": 80
            },
            "mainBoard": {
                "raw": "1C",
                "decimal": 28
            }
        },
        "setpoints": {
            "cupola": {
                "raw": "0082",
                "decimal": 130
            },
            "fondo": {
                "raw": "0039",
                "decimal": 57
            }
        },
        "energyConsumption": {
            "currentPower": 22,
            "powerHistory": []
        },
        "alerts": {
            "overload": {
                "L1": false,
                "L2": false,
                "L3": false,
                "raw": "000"
            },
            "overtemp": {
                "furnace": true,
                "board": true,
                "heatsink": true,
                "raw": "111"
            },
            "triacError": {
                "raw": "0000",
                "decimal": 0
            },
            "resistError": {
                "raw": "0000",
                "decimal": 0
            }
        },
        "lastUpdate": "2025-10-04T08:43:18.699Z",
        "isOnline": true,
        "commandResponse": "0000"
    }
}
     */
    deviceData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.deviceId;
                const result = yield device_service_1.default.getDeviceById(id);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new DeviceController();
