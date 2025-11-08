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
exports.Server = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const express = require("express");
const cors = require("cors");
const db_1 = require("./db");
const path_1 = require("path");
const i18n_1 = require("i18n");
const logger_helper_1 = require("./helpers/logger.helper");
const api_route_1 = require("./apis/api.route");
const mqtt_helper_1 = require("./helpers/mqtt.helper");
const utils_1 = require("./utils");
const env_1 = require("./environment/env");
class Server {
    constructor() {
        this.logger = new utils_1.LoggerUtil('Server');
        this.app = express();
        this.logger.log('Environment', process.env.NODE_ENV);
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setEnv();
            this.setMongodb();
            this.enableCors();
            this.configBodyParser();
            this.setLanguage();
            this.setMqtt();
        });
    }
    setEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, env_1.setEnv)();
        });
    }
    setMongodb() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.connectDb();
        });
    }
    setMqtt() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mqtt_helper_1.default.connect();
        });
    }
    setLanguage() {
        const localePath = (0, path_1.resolve)(process.cwd() + '/assets/locales');
        const i18n = new i18n_1.I18n();
        i18n.configure({
            locales: ['en', 'fr'],
            directory: localePath
        });
        this.app.use(i18n.init);
    }
    enableCors() {
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
    }
    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.json({ limit: '10mb' }));
    }
    setRoutes() {
        this.app.use('/apidoc', express.static((0, path_1.resolve)(process.cwd() + '/assets/apidoc')));
        this.app.use('/logs', express.static((0, path_1.resolve)(process.cwd() + '/logs/combined.log')));
        this.app.use(logger_helper_1.logger);
        this.app.use('/api', api_route_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Route not found',
                status: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            this.logger.error('Error', error);
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        });
    }
}
exports.Server = Server;
