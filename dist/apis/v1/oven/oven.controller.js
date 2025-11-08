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
const oven_service_1 = require("./oven.service");
class OvenController {
    startOven(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.startOven();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    stopOven(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.stopOven();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ovenVersion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.ovenVersion();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ovenStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.ovenStatus();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ovenTemperatures(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.ovenTemperatures();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendCustomCommand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { command } = req.body;
                if (!command) {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'command_required',
                        data: {
                            error: 'Command parameter is required',
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                const result = yield oven_service_1.default.sendCustomCommand(command);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPIDControllers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.getPIDControllers();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getActiveZones(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.getActiveZones();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getRawState(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.getRawState();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getConnectionStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isConnected = oven_service_1.default.isConnected();
                return (0, helpers_1.sendResponse)(res, {
                    status: 200,
                    message: 'connection_status_retrieved',
                    data: {
                        connected: isConnected,
                        timestamp: new Date().toISOString()
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    initializeConnection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const initialized = yield oven_service_1.default.initialize();
                return (0, helpers_1.sendResponse)(res, {
                    status: initialized ? 200 : 500,
                    message: initialized ? 'connection_initialized' : 'connection_initialization_failed',
                    data: {
                        initialized,
                        timestamp: new Date().toISOString()
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    shutdownConnection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield oven_service_1.default.shutdown();
                return (0, helpers_1.sendResponse)(res, {
                    status: 200,
                    message: 'connection_shutdown_successful',
                    data: {
                        timestamp: new Date().toISOString()
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Health check endpoint
    healthCheck(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const isConnected = oven_service_1.default.isConnected();
                const currentState = yield oven_service_1.default.getRawState();
                return (0, helpers_1.sendResponse)(res, {
                    status: 200,
                    message: 'health_check_complete',
                    data: {
                        service: 'OvenController',
                        mqttConnected: isConnected,
                        hasStateData: currentState.data && Object.keys(currentState.data).length > 0,
                        lastStateUpdate: ((_a = currentState.data) === null || _a === void 0 ? void 0 : _a.lastUpdate) || null,
                        timestamp: new Date().toISOString()
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get specific temperature zone
    getTemperatureZone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { zone } = req.params;
                const temperatureResult = yield oven_service_1.default.ovenTemperatures();
                if ((_b = (_a = temperatureResult.data) === null || _a === void 0 ? void 0 : _a.temperatureZones) === null || _b === void 0 ? void 0 : _b[zone.toUpperCase()]) {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 200,
                        message: 'temperature_zone_retrieved',
                        data: {
                            zone: zone.toUpperCase(),
                            temperature: temperatureResult.data.temperatureZones[zone.toUpperCase()],
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                else {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 404,
                        message: 'temperature_zone_not_found',
                        data: {
                            zone: zone.toUpperCase(),
                            availableZones: Object.keys(((_c = temperatureResult.data) === null || _c === void 0 ? void 0 : _c.temperatureZones) || {}),
                            timestamp: new Date().toISOString()
                        }
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Set setpoint (if your system supports this command)
    setTemperatureSetpoint(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, lowValue, highValue } = req.body;
                if (!type) {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_parameters',
                        data: {
                            error: 'Type and values parameters are required',
                            expectedTypes: ['cupola', 'fondo', 'offsetgeneraleplatea', 'platea'],
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                // Convert setpoint command to your control unit's format
                let command = '';
                if (type.toLowerCase() === 'cupola') {
                    command = `<CMD>${lowValue}${highValue}</CMD>`;
                }
                else if (type.toLowerCase() === 'fondo') {
                    command = `<CMD>${lowValue}${highValue}</CMD>`;
                }
                else if (type.toLowerCase() === 'offsetgeneraleplatea') {
                    command = `<CMD>3D${lowValue}${highValue}3D</CMD>`;
                    // command = `<CMD>3D64003D</CMD>`;
                }
                else if (type.toLowerCase() === 'platea') {
                    command = `<CMD>03${lowValue ? lowValue.toString(16) : '32'}${highValue ? highValue : '01'}03</CMD>`;
                    // command = `<CMD>3D64003D</CMD>`;
                }
                else {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_setpoint_type',
                        data: {
                            error: 'Invalid setpoint type',
                            providedType: type,
                            validTypes: ['cupola', 'fondo', 'offsetgeneraleplatea'],
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                const result = yield oven_service_1.default.sendCustomCommand(command);
                return (0, helpers_1.sendResponse)(res, Object.assign(Object.assign({}, result), { message: 'setpoint_command_sent', data: Object.assign(Object.assign({}, result.data), { setpointType: type, setpointLowValue: lowValue, setpointHighValue: highValue }) }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Additional methods for OvenController class
    setDomeTemperature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { temperature } = req.body;
                if (!temperature || typeof temperature !== 'number') {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_temperature',
                        data: {
                            error: 'Temperature parameter is required and must be a number',
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                const result = yield oven_service_1.default.setDomeTemperature(temperature);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    setPlateTemperature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { temperature } = req.body;
                if (!temperature || typeof temperature !== 'number') {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_temperature',
                        data: {
                            error: 'Temperature parameter is required and must be a number',
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                const result = yield oven_service_1.default.setPlateTemperature(temperature);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    setZoneStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { zone, include } = req.body;
                if (!zone || typeof zone !== 'number' || typeof include !== 'boolean') {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_parameters',
                        data: {
                            error: 'Zone (number) and include (boolean) parameters are required',
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                const result = yield oven_service_1.default.setZoneStatus(zone, include);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    setAutoIgnitionTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { hour, minute } = req.body;
                if (typeof hour !== 'number' || typeof minute !== 'number') {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_time_parameters',
                        data: {
                            error: 'Hour and minute parameters are required and must be numbers',
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                const result = yield oven_service_1.default.setAutoIgnitionTime(hour, minute);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    setPIDParameter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { zone, parameter, value } = req.body;
                if (!zone || !parameter || typeof value !== 'number') {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_pid_parameters',
                        data: {
                            error: 'Zone (number), parameter (P/I/D), and value (number) are required',
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                if (!['P', 'I', 'D'].includes(parameter)) {
                    return (0, helpers_1.sendResponse)(res, {
                        status: 400,
                        message: 'invalid_parameter_type',
                        data: {
                            error: 'Parameter must be P, I, or D',
                            provided: parameter,
                            timestamp: new Date().toISOString()
                        }
                    });
                }
                const result = yield oven_service_1.default.setPIDParameter(zone, parameter, value);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    startThermocoupleCompensation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.startThermocoupleCompensation();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    startAutoTuning(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield oven_service_1.default.startAutoTuning();
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new OvenController();
