"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oven_controller_1 = require("./oven.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
class OvenRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Basic oven operations
        this.router.get('/start', auth_middleware_1.default.user, oven_controller_1.default.startOven);
        this.router.get('/stop', auth_middleware_1.default.user, oven_controller_1.default.stopOven);
        // Information endpoints (GET requests)
        this.router.get('/version', auth_middleware_1.default.user, oven_controller_1.default.ovenVersion);
        this.router.get('/status', auth_middleware_1.default.user, oven_controller_1.default.ovenStatus);
        this.router.get('/temperatures', auth_middleware_1.default.user, oven_controller_1.default.ovenTemperatures);
        this.router.get('/temperatures/:zone', auth_middleware_1.default.user, oven_controller_1.default.getTemperatureZone);
        // Advanced operations (POST requests)
        this.router.post('/command', auth_middleware_1.default.user, oven_controller_1.default.sendCustomCommand);
        this.router.post('/setpoint', auth_middleware_1.default.user, oven_controller_1.default.setTemperatureSetpoint);
        // PID and zones information
        this.router.get('/pid', auth_middleware_1.default.user, oven_controller_1.default.getPIDControllers);
        this.router.get('/zones', auth_middleware_1.default.user, oven_controller_1.default.getActiveZones);
        // System management
        this.router.get('/connection', auth_middleware_1.default.user, oven_controller_1.default.getConnectionStatus);
        this.router.post('/initialize', auth_middleware_1.default.user, oven_controller_1.default.initializeConnection);
        this.router.post('/shutdown', auth_middleware_1.default.user, oven_controller_1.default.shutdownConnection);
        // Utilities and debugging
        this.router.get('/health', auth_middleware_1.default.user, oven_controller_1.default.healthCheck);
        this.router.get('/raw', auth_middleware_1.default.user, oven_controller_1.default.getRawState);
        this.router.post('/dome-temperature', auth_middleware_1.default.user, oven_controller_1.default.setDomeTemperature);
        this.router.post('/plate-temperature', auth_middleware_1.default.user, oven_controller_1.default.setPlateTemperature);
        this.router.post('/zone-status', auth_middleware_1.default.user, oven_controller_1.default.setZoneStatus);
        this.router.post('/auto-ignition-time', auth_middleware_1.default.user, oven_controller_1.default.setAutoIgnitionTime);
        this.router.post('/pid-parameter', auth_middleware_1.default.user, oven_controller_1.default.setPIDParameter);
        this.router.post('/thermocouple-compensation', auth_middleware_1.default.user, oven_controller_1.default.startThermocoupleCompensation);
        this.router.post('/auto-tuning', auth_middleware_1.default.user, oven_controller_1.default.startAutoTuning);
        // Admin-only routes (if you have admin authentication)
        // Uncomment and modify if you have admin middleware
        // this.router.post('/emergency-stop', authenticate.admin, ovenController.emergencyStop);
        // this.router.get('/logs', authenticate.admin, ovenController.getLogs);
    }
    // Method to add additional routes dynamically if needed
    addRoute(method, path, ...handlers) {
        this.router[method](path, auth_middleware_1.default.user, ...handlers);
    }
    // Method to add admin-only routes
    addAdminRoute(method, path, ...handlers) {
        // Assuming you have authenticate.admin, otherwise use authenticate.user
        this.router[method](path, auth_middleware_1.default.user, ...handlers);
    }
}
exports.default = new OvenRoutes().router;
