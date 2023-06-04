"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston = require("winston");
const path = require("path");
const { combine, timestamp, label, prettyPrint } = winston_1.format;
class DataDog {
    constructor(req) {
        try {
            if (req.hasOwnProperty('originalUrl')) {
                this.serviceName = req.originalUrl;
            }
            else {
                this.serviceName = req.url;
            }
            this.source = "NodeJS";
            const logDirectoryPath = path.resolve(process.cwd() + '/logs');
            this.logger = (0, winston_1.createLogger)({
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                format: combine(label({ label: 'tray&tracker!' }), timestamp(), winston_1.format.json(), prettyPrint(), winston_1.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })),
                transports: [
                    //
                    // - Write to all logs with level `info` and below to `combined.log` 
                    // - Write all logs error (and below) to `error.log`.
                    //
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: `${logDirectoryPath}/error.log`, level: 'error' }),
                    new winston.transports.File({ filename: `${logDirectoryPath}/combined.log`, level: 'info' })
                ],
            });
        }
        catch (error) {
            console.log("error in constructing logger", error);
        }
    }
    error(message, error) {
        if (!this.logger) {
            console.log(message, error);
            return;
        }
        console.log(message, error);
        if (error.hasOwnProperty('message')) {
            this.logger.error({
                api: this.serviceName,
                message: message,
                error: error.message
            });
            return;
        }
        this.logger.error({
            api: this.serviceName,
            message: message,
            error: error
        });
    }
    info(message, data) {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        console.log(message, data);
        this.logger.info({
            api: this.serviceName,
            message: message,
            data: data
        });
    }
    warn(message, data) {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        console.log(message, data);
        this.logger.warn({
            api: this.serviceName,
            message: message,
            data: data
        });
    }
}
exports.default = DataDog;
