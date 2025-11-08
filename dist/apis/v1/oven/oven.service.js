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
exports.OvenService = void 0;
const mqtt_helper_1 = require("../../../helpers/mqtt.helper");
const utils_1 = require("../../../utils");
const constants_1 = require("../../../constants");
class OvenService {
    constructor() {
        this.logger = new utils_1.LoggerUtil('OvenService');
    }
    startOven() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cmd = '<CMD>010101</CMD>'; // Command to start oven
                this.logger.log(`Sending start oven command: ${cmd}`);
                // Check if we're connected
                if (!mqtt_helper_1.default.isConnected()) {
                    yield mqtt_helper_1.default.connect();
                }
                // Send command and wait for response
                const response = yield mqtt_helper_1.default.cmd(cmd);
                if (!response) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                // Wait a moment and then check current state
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'oven_start_command_sent',
                    data: {
                        commandSent: cmd,
                        commandPublished: true,
                        commandResponse: response,
                        currentStatus: {
                            runAt: currentState.runAt, // Already boolean
                            switchOnOff: currentState.switchOnOff, // Already boolean
                            workStatus: currentState.workStatus,
                            commandResponse: currentState.commandResponse
                        },
                        // Response interpretation
                        responseInfo: {
                            commandAccepted: currentState.commandResponse === 'RXOK' || currentState.commandResponse === 'EXOK',
                            ovenIsOn: currentState.switchOnOff, // Already boolean
                            ovenRunning: currentState.runAt, // Already boolean
                            hasResponse: !!currentState.commandResponse
                        },
                        stateLastUpdated: currentState.lastUpdate,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to start oven:', error);
                // Try to get current state even if command failed
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok, // Return OK but with error info
                    message: 'oven_start_command_sent_with_error',
                    data: {
                        commandSent: '<CMD>010101</CMD>',
                        error: error.message,
                        currentStatus: {
                            runAt: currentState.runAt, // Already boolean
                            switchOnOff: currentState.switchOnOff, // Already boolean
                            workStatus: currentState.workStatus,
                            commandResponse: currentState.commandResponse
                        },
                        responseInfo: {
                            commandAccepted: currentState.commandResponse === 'RXOK' || currentState.commandResponse === 'EXOK',
                            ovenIsOn: currentState.switchOnOff, // Already boolean
                            ovenRunning: currentState.runAt, // Already boolean
                            hasResponse: !!currentState.commandResponse
                        },
                        note: 'Command was sent but an error occurred. Check current status.',
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    stopOven() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cmd = '<CMD>0102</CMD>';
                this.logger.log(`Sending stop oven command: ${cmd}`);
                // Check if we're connected
                if (!mqtt_helper_1.default.isConnected()) {
                    yield mqtt_helper_1.default.connect();
                }
                // Send command and wait for response
                const response = yield mqtt_helper_1.default.cmd(cmd);
                if (!response) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                // Wait a moment and then check current state
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'oven_stop_command_sent',
                    data: {
                        commandSent: cmd,
                        commandPublished: true,
                        commandResponse: response,
                        currentStatus: {
                            runAt: currentState.runAt, // Already boolean
                            switchOnOff: currentState.switchOnOff, // Already boolean
                            workStatus: currentState.workStatus,
                            commandResponse: currentState.commandResponse
                        },
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to stop oven:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'oven_stop_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    ovenVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Getting oven version information');
                // Get current state (version info is broadcast every 2 seconds)
                const currentState = mqtt_helper_1.default.getCurrentState();
                // If we don't have version data, wait for next state update
                if (!currentState.hardwareVersion && !currentState.softwareVersion) {
                    this.logger.log('No cached version data, waiting for state update...');
                    const state = yield this.waitForStateUpdate(8000); // Wait up to 8 seconds
                    return {
                        status: constants_1.HttpStatus.Ok,
                        message: 'oven_version_retrieved',
                        data: {
                            hardwareVersion: state.hardwareVersion ? parseInt(state.hardwareVersion, 10) : null,
                            communicationVersion: state.communicationVersion || null,
                            bootloaderVersion: state.bootloaderVersion || null,
                            softwareVersion: state.softwareVersion || null,
                            timestamp: new Date().toISOString(),
                            source: 'live_state'
                        }
                    };
                }
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'oven_version_retrieved',
                    data: {
                        hardwareVersion: currentState.hardwareVersion ? parseInt(currentState.hardwareVersion, 10) : null,
                        communicationVersion: currentState.communicationVersion || null,
                        bootloaderVersion: currentState.bootloaderVersion || null,
                        softwareVersion: currentState.softwareVersion || null,
                        timestamp: new Date().toISOString(),
                        source: 'cached_state'
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to get oven version:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'oven_version_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    ovenStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Getting oven status');
                const state = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'oven_status_retrieved',
                    data: {
                        systemStatus: {
                            workStatus: state.workStatus || null,
                            runAt: state.runAt, // Already boolean from conversion
                            alarmStatus: state.alarmStatus, // Already boolean from conversion
                            emergencyKey: state.emergencyKey, // Already boolean from conversion
                            switchOnOff: state.switchOnOff, // Already boolean from conversion
                            cronoOn: state.cronoOn // Already boolean from conversion
                        },
                        temperatures: {
                            cupola: state.tempMediaCupola || null,
                            platea: state.tempMediaPlatea || null,
                            compExt: state.tempCompExt || null,
                            heatsink: state.heatsinkTemp || null,
                            mainBoard: state.mainBoardTemp || null
                        },
                        setpoints: {
                            cupola: state.setpointCupola || null,
                            fondo: state.setpointFondo || null
                        },
                        overload: this.parseOverloadStatus(state.overloadStatus),
                        overtemp: this.parseOvertempStatus(state.overtempStatus),
                        commandResponse: state.commandResponse || null,
                        lastUpdate: state.lastUpdate || null,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to get oven status:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'oven_status_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    ovenTemperatures() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Getting oven temperatures');
                const state = mqtt_helper_1.default.getCurrentState();
                // Parse temperature zones
                const temperatureZones = {};
                if (state.tempZones) {
                    Object.keys(state.tempZones).forEach(zone => {
                        temperatureZones[zone] = state.tempZones[zone];
                    });
                }
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'oven_temperatures_retrieved',
                    data: {
                        mainTemperatures: {
                            cupola: state.tempMediaCupola || null,
                            platea: state.tempMediaPlatea || null,
                            compExt: state.tempCompExt || null,
                            heatsink: state.heatsinkTemp || null,
                            mainBoard: state.mainBoardTemp || null
                        },
                        temperatureZones,
                        maxValues: {
                            fornoMax: state.fornoMax || null,
                            heatsinkMax: state.heatsinkMax || null,
                            boardMax: state.boardMax || null
                        },
                        lastUpdate: state.lastUpdate || null,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to get oven temperatures:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'oven_temperatures_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    sendCustomCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log(`Sending custom command: ${command}`);
                // Check if we're connected
                if (!mqtt_helper_1.default.isConnected()) {
                    yield mqtt_helper_1.default.connect();
                }
                // Send command and wait for response
                const response = yield mqtt_helper_1.default.cmd(command);
                if (!response) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                // Wait a moment and then check current state
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'custom_command_sent',
                    data: {
                        commandSent: command,
                        commandPublished: true,
                        commandResponse: response,
                        currentStatus: {
                            runAt: currentState.runAt, // Already boolean
                            switchOnOff: currentState.switchOnOff, // Already boolean
                            workStatus: currentState.workStatus,
                            commandResponse: currentState.commandResponse
                        },
                        setpoints: {
                            cupola: currentState.setpointCupola || null,
                            fondo: currentState.setpointFondo || null
                        },
                        // Response interpretation
                        responseInfo: {
                            commandAccepted: currentState.commandResponse === 'RXOK' || currentState.commandResponse === 'EXOK',
                            ovenIsOn: currentState.switchOnOff, // Already boolean
                            ovenRunning: currentState.runAt, // Already boolean
                            hasResponse: !!currentState.commandResponse
                        },
                        stateLastUpdated: currentState.lastUpdate,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to send custom command:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'custom_command_failed',
                    data: {
                        error: error.message,
                        commandSent: command,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    getPIDControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Getting PID controllers');
                const state = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'pid_controllers_retrieved',
                    data: {
                        pidControllers: state.pidControllers || [],
                        rifATune: state.rifATune || null,
                        lastUpdate: state.lastUpdate || null,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to get PID controllers:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'pid_controllers_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    getActiveZones() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Getting active zones');
                const state = mqtt_helper_1.default.getCurrentState();
                // Parse active zones - they are already converted to booleans in MQTT helper
                const activeZones = state.activeZones || [];
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'active_zones_retrieved',
                    data: {
                        activeZones,
                        activeZonesRaw: state.activeZonesRaw || null,
                        lastUpdate: state.lastUpdate || null,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to get active zones:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'active_zones_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // Additional methods for OvenService class
    // Set dome temperature (cupola)
    setDomeTemperature(temperature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (temperature < 50 || temperature > 400) {
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_temperature_range',
                        data: {
                            error: 'Temperature must be between 50-400°C',
                            provided: temperature,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                // Convert temperature to hex format (little endian)
                const tempHex = temperature.toString(16).padStart(4, '0');
                const lowByte = tempHex.substr(2, 2);
                const highByte = tempHex.substr(0, 2);
                const cmd = `<CMD>02${lowByte}${highByte}02</CMD>`;
                this.logger.log(`Setting dome temperature to ${temperature}°C: ${cmd}`);
                const success = yield mqtt_helper_1.default.cmd(cmd);
                if (!success) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'dome_temperature_set',
                    data: {
                        commandSent: cmd,
                        temperatureSet: temperature,
                        currentSetpoint: currentState.setpointCupola,
                        commandResponse: currentState.commandResponse,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to set dome temperature:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'dome_temperature_set_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // Set plate temperature (platea)
    setPlateTemperature(temperature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (temperature < 50 || temperature > 400) {
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_temperature_range',
                        data: {
                            error: 'Temperature must be between 50-400°C',
                            provided: temperature,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                // Convert temperature to hex format (little endian)
                const tempHex = temperature.toString(16).padStart(4, '0');
                const lowByte = tempHex.substr(2, 2);
                const highByte = tempHex.substr(0, 2);
                const cmd = `<CMD>03${lowByte}${highByte}03</CMD>`;
                this.logger.log(`Setting plate temperature to ${temperature}°C: ${cmd}`);
                const success = yield mqtt_helper_1.default.cmd(cmd);
                if (!success) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'plate_temperature_set',
                    data: {
                        commandSent: cmd,
                        temperatureSet: temperature,
                        currentSetpoint: currentState.setpointFondo,
                        commandResponse: currentState.commandResponse,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to set plate temperature:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'plate_temperature_set_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // Include/exclude heating zones
    setZoneStatus(zone, include) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (zone < 1 || zone > 12) {
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_zone_number',
                        data: {
                            error: 'Zone must be between 1-12',
                            provided: zone,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                // Convert zone number (1-12) to hex (0-11)
                const zoneHex = (zone - 1).toString(16).padStart(2, '0');
                const includeFlag = include ? '01' : '00';
                const cmd = `<CMD>04${zoneHex}${includeFlag}04</CMD>`;
                this.logger.log(`${include ? 'Including' : 'Excluding'} zone ${zone}: ${cmd}`);
                const success = yield mqtt_helper_1.default.cmd(cmd);
                if (!success) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'zone_status_set',
                    data: {
                        commandSent: cmd,
                        zone,
                        included: include,
                        activeZones: currentState.activeZones,
                        commandResponse: currentState.commandResponse,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to set zone status:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'zone_status_set_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // Set automatic ignition timer
    setAutoIgnitionTime(hour, minute) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (hour < 0 || hour > 23) {
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_hour',
                        data: {
                            error: 'Hour must be between 0-23',
                            provided: hour,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                if (minute < 0 || minute > 59) {
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_minute',
                        data: {
                            error: 'Minute must be between 0-59',
                            provided: minute,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                const hourHex = hour.toString(16).padStart(2, '0');
                const minuteHex = minute.toString(16).padStart(2, '0');
                const hourCmd = `<CMD>10${hourHex}0010</CMD>`;
                const minuteCmd = `<CMD>11${minuteHex}0011</CMD>`;
                this.logger.log(`Setting auto ignition time to ${hour}:${minute}`);
                // Send hour command
                let success = yield mqtt_helper_1.default.cmd(hourCmd);
                if (!success) {
                    throw new Error('Failed to publish hour command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 1000));
                // Send minute command
                success = yield mqtt_helper_1.default.cmd(minuteCmd);
                if (!success) {
                    throw new Error('Failed to publish minute command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'auto_ignition_time_set',
                    data: {
                        hourCommandSent: hourCmd,
                        minuteCommandSent: minuteCmd,
                        timeSet: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                        commandResponse: currentState.commandResponse,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to set auto ignition time:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'auto_ignition_time_set_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // Set PID parameters for a zone
    setPIDParameter(zone, parameter, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (zone < 1 || zone > 12) {
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_zone_number',
                        data: {
                            error: 'Zone must be between 1-12',
                            provided: zone,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                if (value < 0 || value > 9999) {
                    return {
                        status: constants_1.HttpStatus.BadRequest,
                        message: 'invalid_pid_value',
                        data: {
                            error: 'PID value must be between 0-9999',
                            provided: value,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                // Convert zone number (1-12) to hex (0-11)
                const zoneHex = (zone - 1).toString(16).padStart(2, '0');
                // Parameter type: 0=P, 1=I, 2=D
                const paramMap = { 'P': '00', 'I': '01', 'D': '02' };
                const paramHex = paramMap[parameter];
                // Convert value to hex (little endian)
                const valueHex = value.toString(16).padStart(4, '0');
                const lowByte = valueHex.substr(2, 2);
                const highByte = valueHex.substr(0, 2);
                const cmd = `<CMD>1A${zoneHex}${paramHex}${lowByte}${highByte}1A</CMD>`;
                this.logger.log(`Setting PID ${parameter} parameter for zone ${zone} to ${value}: ${cmd}`);
                const success = yield mqtt_helper_1.default.cmd(cmd);
                if (!success) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'pid_parameter_set',
                    data: {
                        commandSent: cmd,
                        zone,
                        parameter,
                        value,
                        commandResponse: currentState.commandResponse,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to set PID parameter:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'pid_parameter_set_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // Start thermocouple compensation
    startThermocoupleCompensation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cmd = '<CMD>19AA19</CMD>';
                this.logger.log(`Starting thermocouple compensation: ${cmd}`);
                const success = yield mqtt_helper_1.default.cmd(cmd);
                if (!success) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'thermocouple_compensation_started',
                    data: {
                        commandSent: cmd,
                        commandResponse: currentState.commandResponse,
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to start thermocouple compensation:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'thermocouple_compensation_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    // Start auto-tuning
    startAutoTuning() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cmd = '<CMD>1BAA1B</CMD>';
                this.logger.log(`Starting auto-tuning: ${cmd}`);
                const success = yield mqtt_helper_1.default.cmd(cmd);
                if (!success) {
                    throw new Error('Failed to publish command to MQTT broker');
                }
                yield new Promise(resolve => setTimeout(resolve, 2000));
                const currentState = mqtt_helper_1.default.getCurrentState();
                return {
                    status: constants_1.HttpStatus.Ok,
                    message: 'auto_tuning_started',
                    data: {
                        commandSent: cmd,
                        commandResponse: currentState.commandResponse,
                        note: 'If auto-tuning was already in progress, it has been stopped',
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to start auto-tuning:', error);
                return {
                    status: constants_1.HttpStatus.InternalServerError,
                    message: 'auto_tuning_failed',
                    data: {
                        error: error.message,
                        timestamp: new Date().toISOString()
                    }
                };
            }
        });
    }
    parseOverloadStatus(overloadData) {
        if (!overloadData || overloadData.length < 3)
            return { L1: false, L2: false, L3: false };
        return {
            L1: overloadData[0] === '1',
            L2: overloadData === '1',
            L3: overloadData === '1'
        };
    }
    parseOvertempStatus(overtempData) {
        if (!overtempData || overtempData.length < 3)
            return { furnace: false, board: false, heatsink: false };
        return {
            furnace: overtempData[0] === '1',
            board: overtempData === '1',
            heatsink: overtempData === '1'
        };
    }
    waitForStateUpdate() {
        return __awaiter(this, arguments, void 0, function* (timeoutMs = 5000) {
            return new Promise((resolve, reject) => {
                const startTime = Date.now();
                const checkState = () => {
                    const state = mqtt_helper_1.default.getCurrentState();
                    // Check if we have the basic version information
                    if (state.hardwareVersion || state.softwareVersion) {
                        resolve(state);
                        return;
                    }
                    // Check timeout
                    if (Date.now() - startTime > timeoutMs) {
                        reject(new Error(`Timeout waiting for state update after ${timeoutMs}ms`));
                        return;
                    }
                    // Check again in 200ms
                    setTimeout(checkState, 200);
                };
                checkState();
            });
        });
    }
    // Initialize connection when service is instantiated
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Initializing MQTT connection for OvenService');
                const connected = yield mqtt_helper_1.default.connect();
                if (connected) {
                    this.logger.log('MQTT connection established successfully');
                    return true;
                }
                else {
                    this.logger.error('Failed to establish MQTT connection');
                    return false;
                }
            }
            catch (error) {
                this.logger.error('Error initializing MQTT connection:', error);
                return false;
            }
        });
    }
    // Check connection status
    isConnected() {
        return mqtt_helper_1.default.isConnected();
    }
    // Graceful shutdown
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Shutting down OvenService');
            yield mqtt_helper_1.default.disconnect();
        });
    }
    // Get raw state data (for debugging)
    getRawState() {
        try {
            const state = mqtt_helper_1.default.getCurrentState();
            return Promise.resolve({
                status: constants_1.HttpStatus.Ok,
                message: 'raw_state_retrieved',
                data: state
            });
        }
        catch (error) {
            return Promise.resolve({
                status: constants_1.HttpStatus.InternalServerError,
                message: 'raw_state_failed',
                data: {
                    error: error.message,
                    timestamp: new Date().toISOString()
                }
            });
        }
    }
}
exports.OvenService = OvenService;
exports.default = new OvenService();
