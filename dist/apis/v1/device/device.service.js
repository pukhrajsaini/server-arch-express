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
const mqtt_helper_1 = require("../../../helpers/mqtt.helper");
const device_model_1 = require("../../../models/device.model");
const restaurant_model_1 = require("../../../models/restaurant.model");
const utils_1 = require("../../../utils");
const utils_2 = require("../../../utils");
class DeviceService {
    constructor() {
        this.logger = new utils_2.LoggerUtil('DeviceService');
    }
    create(payload, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield device_model_1.default.findOne({
                $or: [
                    { id: payload.id },
                    { serialNumber: payload.serialNumber },
                ]
            });
            if (device)
                return { status: constants_1.HttpStatus.BadRequest, message: 'device_already_exists' };
            const displayId = utils_1.OpenId.generate(6, 'D');
            const newDevice = yield device_model_1.default.create(Object.assign(Object.assign({}, payload), { displayId, createdBy: admin._id }));
            return {
                status: constants_1.HttpStatus.Created,
                message: 'device_created',
                data: {
                    _id: newDevice._id,
                    name: newDevice.name,
                    displayId: newDevice.displayId,
                    id: newDevice.id,
                }
            };
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const match = {
                isDeleted: false,
                restaurantId: { $exists: true }
            };
            if (query.isAssigned === 'false') {
                match.restaurantId = { $exists: false };
            }
            if (query.isAssigned === undefined) {
                delete match.restaurantId;
            }
            const result = yield device_model_1.default.aggregate([
                {
                    $match: match
                },
                {
                    $lookup: {
                        from: 'restaurants',
                        localField: 'restaurantId',
                        foreignField: '_id',
                        as: 'restaurantId'
                    }
                },
                {
                    $unwind: {
                        path: '$restaurantId',
                        preserveNullAndEmptyArrays: true
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
                                $project: {
                                    name: 1,
                                    displayId: 1,
                                    id: 1,
                                    serialNumber: 1,
                                    hwVersion: 1,
                                    swVersion: 1,
                                    btLoaderVersion: 1,
                                    isAssigned: 1,
                                    createdAt: 1,
                                    updatedAt: 1,
                                    isActive: 1,
                                    resturantName: "$restaurantId.name",
                                    location: "$restaurantId.city"
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
                message: 'devices_list',
                data: Object.assign({ page,
                    limit }, result[0])
            };
        });
    }
    details(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield device_model_1.default.findById(id, {
                isDeleted: 0,
                __v: 0
            }).lean();
            if (!device)
                return {
                    status: constants_1.HttpStatus.BadRequest,
                    message: 'invalid_device_id'
                };
            let restaurant = {};
            if (device.restaurantId) {
                restaurant = yield restaurant_model_1.RestaurantModel.findById(device.restaurantId, {
                    name: 1,
                    _id: 1,
                    city: 1,
                    streetNumber: 1,
                    streetName: 1,
                    postalCode: 1,
                    description: 1
                });
            }
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'device_details',
                data: Object.assign(Object.assign({}, device), { restaurant })
            };
        });
    }
    assign(payload, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deviceId, restaurantId, isAssigned } = payload;
            const device = yield device_model_1.default.findById(deviceId);
            if (!device)
                return {
                    status: constants_1.HttpStatus.BadRequest,
                    message: 'invalid_device_id'
                };
            if (isAssigned) {
                if (device.restaurantId)
                    return {
                        status: constants_1.HttpStatus.Conflict,
                        message: 'device_already_assigned'
                    };
                device.restaurantId = restaurantId;
                device.assignedBy = admin._id;
                yield device.save();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'device_assigned',
                };
            }
            else {
                if (!device.restaurantId)
                    return {
                        status: constants_1.HttpStatus.Conflict,
                        message: 'device_already_unassigned'
                    };
                device.restaurantId = null;
                device.unassignedBy = admin._id;
                yield device.save();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'device_unassigned',
                };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield device_model_1.default.findById(id);
            if (!device)
                return { status: constants_1.HttpStatus.BadRequest, message: 'invalid_device_id' };
            if (device.restaurantId)
                return {
                    status: constants_1.HttpStatus.Conflict,
                    message: 'cannot_delete_assigned_device'
                };
            device.isDeleted = true;
            yield device.save();
            return { status: constants_1.HttpStatus.Ok, message: 'device_deleted' };
        });
    }
    restaurantDevices(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield device_model_1.default.find({
                restaurantId,
                isDeleted: false
            }, {
                name: 1,
                displayId: 1,
                id: 1,
                serialNumber: 1,
                hwVersion: 1,
                swVersion: 1,
                btLoaderVersion: 1,
                isAssigned: 1,
                createdAt: 1,
                updatedAt: 1
            }).lean();
            if ((devices === null || devices === void 0 ? void 0 : devices.length) > 0) {
                const state = mqtt_helper_1.default.getCurrentState();
                devices.forEach((device) => {
                    var _a, _b;
                    device.serialNumber = state.serialNumber || device.serialNumber;
                    device.hwVersion = state.hardwareVersion || device.hwVersion;
                    device.swVersion = state.softwareVersion || device.swVersion;
                    device.btLoaderVersion = state.bootloaderVersion || device.btLoaderVersion;
                    device.temperature = ((_a = state.tempMediaCupola) === null || _a === void 0 ? void 0 : _a.decimal) || 0;
                    device.switchOnOff = state.switchOnOff || false;
                    device.activeTime = ((_b = state.timerOn) === null || _b === void 0 ? void 0 : _b.decimal) || 0;
                    device.isActive = state.switchOnOff || false;
                });
            }
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'restaurant_devices',
                data: devices
            };
        });
    }
    getDeviceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const device = yield device_model_1.default.findById(id, {
                    isDeleted: 0,
                    __v: 0
                }).lean();
                if (!device)
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_device_id'
                    };
                const state = mqtt_helper_1.default.getCurrentState();
                device.serialNumber = state.serialNumber || device.serialNumber;
                device.hwVersion = state.hardwareVersion || device.hwVersion;
                device.swVersion = state.softwareVersion || device.swVersion;
                device.btLoaderVersion = state.bootloaderVersion || device.btLoaderVersion;
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'device_details',
                    data: Object.assign(Object.assign({}, device), { temperature: (_a = state.tempMediaCupola) === null || _a === void 0 ? void 0 : _a.decimal, currentStatus: {
                            workStatus: state.workStatus || null,
                            runAt: state.runAt || false,
                            alarmStatus: state.alarmStatus || false,
                            emergencyKey: state.emergencyKey || false,
                            switchOnOff: state.switchOnOff || false,
                            cronoOn: state.cronoOn || false
                        }, temperatures: {
                            cupola: state.setpointCupola || null,
                            platea: state.setpointFondo || null,
                            fondo: state.tempMediaPlatea || null,
                            compExt: state.tempCompExt || null,
                            heatsink: state.heatsinkTemp || null,
                            mainBoard: state.mainBoardTemp || null
                        }, setpoints: {
                            cupola: state.setpointCupola || null,
                            platea: state.setpointFondo || null
                        }, energyConsumption: {
                            // You can add energy consumption data here
                            // This would typically come from historical data or calculations
                            currentPower: ((_b = state.ampMax) === null || _b === void 0 ? void 0 : _b.decimal) || 0, // Example using current data
                            powerHistory: this.generatePowerHistory(state), // Placeholder for historical power data
                            statistics: {
                                averagePower: this.calculateAveragePower(state),
                                peakPower: ((_c = state.ampMax) === null || _c === void 0 ? void 0 : _c.decimal) || 0,
                                totalEnergy: 0 // You can calculate this from historical data
                            }
                        }, alerts: {
                            overload: state.overloadStatus || null,
                            overtemp: state.overtempStatus || null,
                            triacError: state.triacError || null,
                            resistError: state.resistError || null
                        }, lastUpdate: state.lastUpdate || new Date().toISOString(), isOnline: mqtt_helper_1.default.isConnected(), commandResponse: state.commandResponse || null })
                };
            }
            catch (error) {
                this.logger.error('Failed to get device by ID:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'device_details_failed',
                    data: {
                        error: error.message,
                        deviceId: id,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // async getDeviceById(id: string): Promise<ServiceResponse> {
    //     try {
    //         this.logger.log(`Getting device details for ID: ${id}`);
    //         const device = await DeviceModel.findById(id, {
    //             isDeleted: 0,
    //             __v: 0
    //         }).lean();
    //         if (!device) {
    //             return {
    //                 status: HttpStatus.BadRequest,
    //                 message: 'invalid_device_id'
    //             };
    //         }
    //         // Extract device ID from your device document
    //         // Assuming your device schema has a deviceId field that contains the 12-character ID
    //         const deviceId = device.displayId; // Adjust this based on your device schema
    //         // Get state for the specific device
    //         let state:any = MQTT.getDeviceState(deviceId);
    // device.serialNumber = state.serialNumber || device.serialNumber;
    //         device.hwVersion = state.hardwareVersion || device.hwVersion;
    //         device.swVersion = state.softwareVersion || device.swVersion;
    //         device.btLoaderVersion = state.bootloaderVersion || device.btLoaderVersion;
    //         // If no state found for this device, try to connect to it
    //         if (!state.lastUpdate) {
    //             this.logger.log(`No state found for device ${deviceId}, attempting to connect...`);
    //             await MQTT.connect(deviceId);
    //             // Wait a moment for state to update
    //             await new Promise(resolve => setTimeout(resolve, 2000));
    //             // Get state again after connection attempt
    //             const updatedState = MQTT.getDeviceState(deviceId);
    //             if (updatedState.lastUpdate) {
    //                 state = updatedState;
    //             }
    //         }
    //         return {
    //             status: HttpStatus.Ok,
    //             message: 'device_details',
    //             data: {
    //                 ...device,
    //                 // Basic device info
    //                 deviceId: deviceId,
    //                 temperature: state.tempMediaCupola?.decimal || 20,
    //                 // Current status
    //                 currentStatus: {
    //                     workStatus: state.workStatus || null,
    //                     runAt: state.runAt || false,
    //                     alarmStatus: state.alarmStatus || false,
    //                     emergencyKey: state.emergencyKey || false,
    //                     switchOnOff: state.switchOnOff || false,
    //                     cronoOn: state.cronoOn || false
    //                 },
    //                 // Temperature readings
    //                 temperatures: {
    //                     cupola: state.tempMediaCupola || null,
    //                     platea: state.tempMediaPlatea || null,
    //                     compExt: state.tempCompExt || null,
    //                     heatsink: state.heatsinkTemp || null,
    //                     mainBoard: state.mainBoardTemp || null,
    //                     zones: state.tempZones || null
    //                 },
    //                 // Setpoints
    //                 setpoints: {
    //                     cupola: state.setpointCupola || null,
    //                     platea: state.setpointFondo || null
    //                 },
    //                 // Energy consumption data
    //                 energyConsumption: {
    //                     currentPower: state.ampMax?.decimal || 0,
    //                     maximumCurrent: state.ampMax || null,
    //                     minimumZoneCurrent: state.ampMinZona || null,
    //                     powerHistory: this.generatePowerHistory(state), // You can implement this
    //                     statistics: {
    //                         averagePower: this.calculateAveragePower(state),
    //                         peakPower: state.ampMax?.decimal || 0,
    //                         totalEnergy: 0 // You can calculate this from historical data
    //                     }
    //                 },
    //                 // Alerts and errors
    //                 alerts: {
    //                     overload: state.overloadStatus || null,
    //                     overtemp: state.overtempStatus || null,
    //                     triacError: state.triacError || null,
    //                     resistError: state.resistError || null
    //                 },
    //                 // Configuration
    //                 configuration: {
    //                     powerOutputMode: state.powerOutMode || null,
    //                     maximumTemperatures: {
    //                         furnace: state.fornoMax || null,
    //                         heatsink: state.heatsinkMax || null,
    //                         board: state.boardMax || null
    //                     },
    //                     offsets: {
    //                         generalDome: state.offsetGeneraleCupola || null,
    //                         generalFloor: state.offsetGeneralePlatea || null,
    //                         floor3_4: state.offsetPlatea3_4 || null,
    //                         floor5_6: state.offsetPlatea5_6 || null
    //                     },
    //                     timer: {
    //                         onHours: state.timerOn || null,
    //                         onMinutes: state.minuteOn || null
    //                     },
    //                     activeZones: state.activeZones || [],
    //                     weekDays: state.weekDays || null,
    //                     pidControllers: state.pidControllers || []
    //                 },
    //                 // System info
    //                 systemInfo: {
    //                     hardwareVersion: state.hardwareVersion || null,
    //                     communicationVersion: state.communicationVersion || null,
    //                     bootloaderVersion: state.bootloaderVersion || null,
    //                     softwareVersion: state.softwareVersion || null,
    //                     date: state.date || null,
    //                     time: state.time || null,
    //                     timezone: state.timezone || null
    //                 },
    //                 // Connection status
    //                 lastUpdate: state.lastUpdate || new Date().toISOString(),
    //                 isOnline: MQTT.isConnected(),
    //                 commandResponse: state.commandResponse || null,
    //                 hasData: !!state.lastUpdate,
    //                 timestamp: new Date().toISOString()
    //             }
    //         };
    //     } catch (error: any) {
    //         this.logger.error('Failed to get device by ID:', error);
    //         return {
    //             status: HttpStatus.InternalServerError,
    //             message: 'device_details_failed',
    //             data: {
    //                 error: error.message,
    //                 deviceId: id,
    //                 timestamp: new Date().toISOString()
    //             }
    //         };
    //     }
    // }
    // Helper methods for energy consumption data
    generatePowerHistory(state) {
        var _a, _b;
        // Use actual temperature data from the state
        const currentCupolaTemp = ((_a = state.tempMediaCupola) === null || _a === void 0 ? void 0 : _a.decimal) || 20;
        const currentPlateaTemp = ((_b = state.tempMediaPlatea) === null || _b === void 0 ? void 0 : _b.decimal) || 20;
        return [
            {
                time: '10min',
                cupolaTemperature: Math.max(20, currentCupolaTemp - 80),
                plateaTemperature: Math.max(20, currentPlateaTemp - 80),
                power: 1200
            },
            {
                time: '20min',
                cupolaTemperature: Math.max(20, currentCupolaTemp - 60),
                plateaTemperature: Math.max(20, currentPlateaTemp - 60),
                power: 1800
            },
            {
                time: '30min',
                cupolaTemperature: Math.max(20, currentCupolaTemp - 40),
                plateaTemperature: Math.max(20, currentPlateaTemp - 40),
                power: 2200
            },
            {
                time: '40min',
                cupolaTemperature: Math.max(20, currentCupolaTemp - 20),
                plateaTemperature: Math.max(20, currentPlateaTemp - 20),
                power: 2500
            },
            {
                time: '50min',
                cupolaTemperature: currentCupolaTemp,
                plateaTemperature: currentPlateaTemp,
                power: 2300
            },
            {
                time: '60min',
                cupolaTemperature: currentCupolaTemp,
                plateaTemperature: currentPlateaTemp,
                power: 2000
            },
            {
                time: '70min',
                cupolaTemperature: currentCupolaTemp,
                plateaTemperature: currentPlateaTemp,
                power: 1800
            },
            {
                time: '80min',
                cupolaTemperature: currentCupolaTemp,
                plateaTemperature: currentPlateaTemp,
                power: 1600
            }
        ];
    }
    calculateAveragePower(state) {
        var _a;
        // Implement your average power calculation logic
        return ((_a = state.ampMax) === null || _a === void 0 ? void 0 : _a.decimal) ? state.ampMax.decimal * 0.7 : 0;
    }
}
exports.default = new DeviceService();
