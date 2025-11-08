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
const mqtt_1 = require("mqtt");
const env_1 = require("../environment/env");
const utils_1 = require("../utils");
class MQTTHelper {
    constructor() {
        this.client = null;
        this.currentDeviceId = "9BBA199300"; // Default device ID
        this.topicCmd = `FAZ_${this.currentDeviceId}/Cmd`;
        this.topicState = `FAZ_${this.currentDeviceId}/State`;
        this.pendingRequests = new Map();
        this.deviceStates = new Map(); // Store states for multiple devices
        this.stateCallbacks = [];
        this.logger = new utils_1.LoggerUtil("MQTT");
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.lastMessageTime = 0;
    }
    // Set the current device ID and update topics
    setCurrentDevice(deviceId) {
        var _a;
        if (deviceId.length !== 12) {
            throw new Error("Device ID must be 12 characters long");
        }
        this.currentDeviceId = deviceId;
        this.topicCmd = `FAZ_${deviceId}/Cmd`;
        this.topicState = `FAZ_${deviceId}/State`;
        this.logger.log(`Switched to device: ${deviceId}`);
        this.logger.log(`Command topic: ${this.topicCmd}`);
        this.logger.log(`State topic: ${this.topicState}`);
        // Subscribe to the new state topic if connected
        if ((_a = this.client) === null || _a === void 0 ? void 0 : _a.connected) {
            this.client.subscribe(this.topicState, { qos: 1 }, (err) => {
                if (err) {
                    this.logger.error(`Failed to subscribe to state topic for device ${deviceId}:`, err);
                }
                else {
                    this.logger.log(`Subscribed to ${this.topicState}`);
                }
            });
        }
    }
    getCurrentDeviceId() {
        return this.currentDeviceId;
    }
    connect(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set device if provided
            if (deviceId) {
                this.setCurrentDevice(deviceId);
            }
            return new Promise((resolve) => {
                if (this.client) {
                    this.client.end(true);
                    this.client = null;
                }
                const url = env_1.default.MQTT_URL.includes("8883")
                    ? env_1.default.MQTT_URL.replace("mqtt://", "mqtts://")
                    : env_1.default.MQTT_URL;
                const options = {
                    rejectUnauthorized: false,
                    connectTimeout: 5000,
                    protocolVersion: 4,
                    protocol: "tcp",
                    host: env_1.default.MQTT_IP,
                    hostname: env_1.default.MQTT_IP,
                };
                this.logger.log(`Attempting connection to: ${url} for device: ${this.currentDeviceId}`);
                this.client = mqtt_1.default.connect(url, options);
                this.setupEventHandlers();
                this.client.on("connect", () => {
                    this.logger.log(`MQTT connection established for device: ${this.currentDeviceId}`);
                    this.reconnectAttempts = 0;
                    this.client.subscribe(this.topicState, { qos: 1 }, (err) => {
                        if (err) {
                            this.logger.error("Failed to subscribe to state topic:", err);
                        }
                        else {
                            this.logger.log(`Subscribed to ${this.topicState}`);
                        }
                    });
                    this.startHealthMonitor();
                    resolve(true);
                });
                this.client.on("message", (topic, message) => {
                    this.lastMessageTime = Date.now();
                    this.handleStateMessage(topic, message.toString());
                });
                this.client.on("error", (err) => {
                    this.logger.error("MQTT connection error:", err);
                    resolve(false);
                });
            });
        });
    }
    setupEventHandlers() {
        if (!this.client)
            return;
        this.client.on("close", () => {
            this.logger.log("MQTT connection closed");
            this.stopHealthMonitor();
            this.scheduleReconnect();
        });
        this.client.on("offline", () => {
            this.logger.log("MQTT client offline");
        });
        this.client.on("reconnect", () => {
            this.logger.log("MQTT reconnecting...");
        });
    }
    scheduleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.logger.error("Max reconnection attempts reached");
            return;
        }
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        this.reconnectAttempts++;
        setTimeout(() => {
            this.logger.log(`Reconnection attempt ${this.reconnectAttempts}`);
            this.connect();
        }, delay);
    }
    startHealthMonitor() {
        this.healthCheckInterval = setInterval(() => {
            const timeSinceLastMessage = Date.now() - this.lastMessageTime;
            if (timeSinceLastMessage > 30000) {
                this.logger.warn("No state messages received recently");
            }
        }, 30000);
    }
    stopHealthMonitor() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
    }
    parseXmlValue(xml, tag) {
        const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, "i");
        const match = xml.match(regex);
        return match ? match[1] : null;
    }
    handleStateMessage(topic, xmlData) {
        try {
            if (!xmlData.includes('<') || !xmlData.includes('>')) {
                throw new Error("Invalid XML format");
            }
            // Extract device ID from topic
            const deviceId = topic.split('/')[0].replace('FAZ_', '');
            const state = this.parseStateData(xmlData);
            // Check for critical fields to validate state
            if (!state.tempMediaCupola && !state.tempMediaPlatea) {
                throw new Error("Missing critical temperature fields");
            }
            const fullState = Object.assign(Object.assign({}, state), { lastUpdate: new Date().toISOString(), rawXml: xmlData });
            // Store state for this specific device
            this.deviceStates.set(deviceId, fullState);
            // If this is the current device, also update latestState for backward compatibility
            if (deviceId === this.currentDeviceId) {
                this.deviceStates.set(this.currentDeviceId, fullState);
            }
            this.logger.log(`State updated for device: ${deviceId}`);
            this.notifyStateCallbacks(fullState, deviceId);
            this.checkPendingRequests(fullState, deviceId);
        }
        catch (err) {
            this.logger.error("Failed to handle state message:", err);
            // Extract device ID from topic for error state
            const deviceId = topic.split('/')[0].replace('FAZ_', '');
            const errorState = {
                rawXml: xmlData,
                lastUpdate: new Date().toISOString(),
                commandResponse: `ERROR: ${err.message}`
            };
            this.notifyStateCallbacks(errorState, deviceId);
        }
    }
    parseStateData(xmlData) {
        const state = {};
        // Parse all basic fields directly onto the state object
        const fields = {
            // Hardware/Software versions
            hardwareVersion: "HW",
            communicationVersion: "SWE",
            bootloaderVersion: "BT",
            softwareVersion: "SW",
            // Date/Time
            date: "DD",
            time: "TT",
            timezone: "TZ",
            // Status fields
            workStatus: "W",
            runAt: "RA",
            alarmStatus: "AL",
            emergencyKey: "EM",
            cronoOn: "CR",
            switchOnOff: "OF",
            // Temperature readings
            tempMediaCupola: "MC",
            tempMediaPlatea: "MP",
            tempCompExt: "TE",
            heatsinkTemp: "TH",
            mainBoardTemp: "TM",
            // Setpoints
            setpointCupola: "SC",
            setpointFondo: "SF",
            // Configuration values
            ampMax: "A1",
            ampMinZona: "A2",
            powerOutMode: "PO",
            fornoMax: "FM",
            heatsinkMax: "HM",
            boardMax: "BM",
            // Offsets
            offsetGeneraleCupola: "SG",
            offsetGeneralePlatea: "SP",
            offsetPlatea3_4: "S1",
            offsetPlatea5_6: "S2",
            // Timer settings
            timerOn: "OO",
            minuteOn: "MO",
            // PID reference
            rifATune: "RT",
            // Error status
            triacError: "TE",
            resistError: "RE",
            // Command response
            commandResponse: "RPY"
        };
        // Parse all basic fields directly
        for (const [key, tag] of Object.entries(fields)) {
            const rawValue = this.parseXmlValue(xmlData, tag);
            if (rawValue) {
                state[key] = this.convertFieldValue(key, rawValue);
            }
        }
        // Parse overload status (OL)
        const overloadRaw = this.parseXmlValue(xmlData, "OL");
        if (overloadRaw && overloadRaw.length >= 3) {
            state.overloadStatus = {
                L1: overloadRaw[0] === '1',
                L2: overloadRaw[1] === '1',
                L3: overloadRaw[2] === '1',
                raw: overloadRaw
            };
        }
        // Parse overtemp status (OT)
        const overtempRaw = this.parseXmlValue(xmlData, "OT");
        if (overtempRaw && overtempRaw.length >= 3) {
            state.overtempStatus = {
                furnace: overtempRaw[0] === '1',
                board: overtempRaw[1] === '1',
                heatsink: overtempRaw[2] === '1',
                raw: overtempRaw
            };
        }
        // Parse active zones (ZZ)
        const activeZonesRaw = this.parseXmlValue(xmlData, "ZZ");
        if (activeZonesRaw) {
            const activeZones = [];
            for (let i = 0; i < Math.min(12, activeZonesRaw.length); i++) {
                activeZones.push(activeZonesRaw[i] === '1');
            }
            state.activeZones = activeZones;
            state.activeZonesRaw = activeZonesRaw;
        }
        // Parse week days (GG)
        const weekDaysRaw = this.parseXmlValue(xmlData, "GG");
        if (weekDaysRaw && weekDaysRaw.length >= 7) {
            state.weekDays = {
                monday: weekDaysRaw[0] === '1',
                tuesday: weekDaysRaw[1] === '1',
                wednesday: weekDaysRaw[2] === '1',
                thursday: weekDaysRaw[3] === '1',
                friday: weekDaysRaw[4] === '1',
                saturday: weekDaysRaw[5] === '1',
                sunday: weekDaysRaw[6] === '1',
                raw: weekDaysRaw
            };
        }
        // Parse temperature zones (T1-TC)
        const tempZones = {};
        const zoneLabels = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "TA", "TB", "TC"];
        for (const label of zoneLabels) {
            const val = this.parseXmlValue(xmlData, label);
            if (val) {
                tempZones[label] = {
                    raw: val,
                    decimal: parseInt(val, 16)
                };
            }
        }
        state.tempZones = tempZones;
        // Parse PID controllers (K1-KC)
        const pidControllers = [];
        const pidLabels = ["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "KA", "KB", "KC"];
        for (let i = 0; i < pidLabels.length; i++) {
            const label = pidLabels[i];
            const pid = this.parseXmlValue(xmlData, label);
            if (pid && pid.includes('-')) {
                const [kpHex, kiHex, kdHex] = pid.split("-");
                pidControllers.push({
                    zone: i,
                    label,
                    kp: {
                        raw: kpHex,
                        decimal: parseInt(kpHex, 16)
                    },
                    ki: {
                        raw: kiHex,
                        decimal: parseInt(kiHex, 16)
                    },
                    kd: {
                        raw: kdHex,
                        decimal: parseInt(kdHex, 16)
                    }
                });
            }
        }
        state.pidControllers = pidControllers;
        return state;
    }
    convertFieldValue(fieldName, rawValue) {
        const hex16Fields = ['tempMediaCupola', 'tempMediaPlatea', 'setpointCupola', 'setpointFondo',
            'offsetGeneraleCupola', 'offsetGeneralePlatea', 'rifATune', 'triacError', 'resistError'];
        const hex8Fields = ['workStatus', 'heatsinkTemp', 'mainBoardTemp', 'ampMax',
            'ampMinZona', 'powerOutMode', 'fornoMax', 'heatsinkMax', 'boardMax',
            'offsetPlatea3_4', 'offsetPlatea5_6', 'timerOn', 'minuteOn'];
        const stringFields = ['hardwareVersion', 'communicationVersion', 'bootloaderVersion', 'softwareVersion',
            'date', 'time', 'timezone', 'commandResponse'];
        const booleanFields = ['runAt', 'alarmStatus', 'emergencyKey', 'cronoOn', 'switchOnOff'];
        if (hex16Fields.includes(fieldName)) {
            return {
                raw: rawValue,
                decimal: parseInt(rawValue, 16)
            };
        }
        else if (hex8Fields.includes(fieldName)) {
            return {
                raw: rawValue,
                decimal: parseInt(rawValue, 16)
            };
        }
        else if (booleanFields.includes(fieldName)) {
            return rawValue === '1';
        }
        else if (stringFields.includes(fieldName)) {
            return rawValue;
        }
        else {
            const numValue = parseInt(rawValue, 16);
            if (!isNaN(numValue)) {
                return {
                    raw: rawValue,
                    decimal: numValue
                };
            }
            return rawValue;
        }
    }
    notifyStateCallbacks(state, deviceId) {
        for (const callback of this.stateCallbacks) {
            try {
                callback(state, deviceId);
            }
            catch (err) {
                this.logger.error("Error in state callback:", err);
            }
        }
    }
    checkPendingRequests(state, deviceId) {
        for (const [key, request] of this.pendingRequests.entries()) {
            // Only resolve requests for the current device or if no device specified
            if (!request.deviceId || request.deviceId === deviceId) {
                const { expectedField } = request;
                if (!expectedField || state[expectedField] !== undefined) {
                    clearTimeout(request.timeout);
                    request.resolve(state);
                    this.pendingRequests.delete(key);
                }
            }
        }
    }
    // COMMAND METHODS with device support
    cmd(cmd_1) {
        return __awaiter(this, arguments, void 0, function* (cmd, timeout = 10000, deviceId) {
            var _a;
            // Use specified device or current device
            const targetDeviceId = deviceId || this.currentDeviceId;
            if (!((_a = this.client) === null || _a === void 0 ? void 0 : _a.connected)) {
                const connected = yield this.connect(targetDeviceId);
                if (!connected)
                    throw new Error("Not connected to MQTT broker");
            }
            // If different device specified, temporarily switch
            const originalDeviceId = this.currentDeviceId;
            if (deviceId && deviceId !== this.currentDeviceId) {
                this.setCurrentDevice(deviceId);
            }
            return new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    this.pendingRequests.delete(cmd);
                    reject(new Error("Command timeout"));
                }, timeout);
                this.pendingRequests.set(cmd, {
                    resolve: (response) => {
                        clearTimeout(timeoutId);
                        // Restore original device if we switched
                        if (deviceId && deviceId !== originalDeviceId) {
                            this.setCurrentDevice(originalDeviceId);
                        }
                        resolve(response);
                    },
                    reject: (error) => {
                        clearTimeout(timeoutId);
                        // Restore original device if we switched
                        if (deviceId && deviceId !== originalDeviceId) {
                            this.setCurrentDevice(originalDeviceId);
                        }
                        reject(error);
                    },
                    timeout: timeoutId,
                    expectedField: "commandResponse",
                    deviceId: targetDeviceId
                });
                this.client.publish(this.topicCmd, cmd, { qos: 1 }, (err) => {
                    if (err) {
                        clearTimeout(timeoutId);
                        this.pendingRequests.delete(cmd);
                        // Restore original device if we switched
                        if (deviceId && deviceId !== originalDeviceId) {
                            this.setCurrentDevice(originalDeviceId);
                        }
                        reject(err);
                    }
                    else {
                        this.logger.log(`Command sent to device ${targetDeviceId}: ${cmd}`);
                    }
                });
            });
        });
    }
    // Get state for specific device
    getDeviceState(deviceId) {
        return this.deviceStates.get(deviceId) || {};
    }
    // Get current state (for backward compatibility)
    getCurrentState() {
        return this.deviceStates.get(this.currentDeviceId) || {};
    }
    // Update onStateUpdate to include deviceId
    onStateUpdate(callback) {
        this.stateCallbacks.push(callback);
    }
    removeStateCallback(callback) {
        const index = this.stateCallbacks.indexOf(callback);
        if (index !== -1) {
            this.stateCallbacks.splice(index, 1);
        }
    }
    isConnected() {
        var _a;
        return ((_a = this.client) === null || _a === void 0 ? void 0 : _a.connected) || false;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopHealthMonitor();
            for (const request of this.pendingRequests.values()) {
                clearTimeout(request.timeout);
                request.reject(new Error("Disconnected"));
            }
            this.pendingRequests.clear();
            this.stateCallbacks = [];
            if (this.client) {
                this.client.end(true);
                this.client = null;
            }
            this.logger.log("MQTT disconnected");
        });
    }
    // Device-specific command methods
    powerOn(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cmd("PWR,1", 10000, deviceId);
        });
    }
    powerOff(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cmd("PWR,0", 10000, deviceId);
        });
    }
    setDomeTemperature(temperature, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempHex = temperature.toString(16).toUpperCase().padStart(4, '0');
            return this.cmd(`STC,${tempHex}`, 10000, deviceId);
        });
    }
    setFloorTemperature(temperature, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempHex = temperature.toString(16).toUpperCase().padStart(4, '0');
            return this.cmd(`STF,${tempHex}`, 10000, deviceId);
        });
    }
    setZoneTemperature(zone, temperature, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (zone < 0 || zone > 11)
                throw new Error("Zone must be between 0-11");
            const zoneHex = (zone + 1).toString(16).toUpperCase().padStart(2, '0');
            const tempHex = temperature.toString(16).toUpperCase().padStart(4, '0');
            return this.cmd(`STZ,${zoneHex},${tempHex}`, 10000, deviceId);
        });
    }
    setActiveZones(zones, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (zones.length !== 12)
                throw new Error("Must provide 12 zone values");
            const zoneString = zones.map(zone => zone ? '1' : '0').join('');
            return this.cmd(`ACT,${zoneString}`, 10000, deviceId);
        });
    }
    setCronoMode(enabled, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cmd(`CRN,${enabled ? '1' : '0'}`, 10000, deviceId);
        });
    }
    resetAlarms(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cmd("RAL,1", 10000, deviceId);
        });
    }
    emergencyStop(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cmd("EMG,1", 10000, deviceId);
        });
    }
    getStatus(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cmd("STS,1", 10000, deviceId);
        });
    }
    reboot(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cmd("RBT,1", 10000, deviceId);
        });
    }
}
const MQTT = new MQTTHelper();
exports.default = MQTT;
