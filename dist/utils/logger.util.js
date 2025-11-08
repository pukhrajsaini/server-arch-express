"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerUtil = void 0;
const winston_1 = require("winston");
const winston = require("winston");
const path = require("path");
const { combine, timestamp, prettyPrint } = winston_1.format;
const chalk_1 = require("chalk");
class LoggerUtil {
    constructor(context) {
        this.context = context;
        const logDirectoryPath = path.resolve(process.cwd(), 'logs');
        const transports = [
            new winston.transports.File({ filename: `${logDirectoryPath}/error.log`, level: 'error' }),
            new winston.transports.File({ filename: `${logDirectoryPath}/combined.log`, level: 'info' }),
        ];
        this.logger = (0, winston_1.createLogger)({
            format: combine(timestamp(), winston_1.format.json(), prettyPrint(), winston_1.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })),
            transports,
        });
    }
    error(message, error) {
        this.logger.error({
            context: this.context,
            message: message,
            error: error,
        });
        console.error(chalk_1.default.red(`ERROR: ${chalk_1.default.bold(new Date().toISOString())} [${this.context}] ${message}`), chalk_1.default.red(error));
    }
    warn(message, data) {
        this.logger.warn({
            context: this.context,
            message: message,
            data: data || '',
        });
        console.warn(chalk_1.default.yellow(`WARN: ${chalk_1.default.bold(new Date().toISOString())} [${this.context}] ${message}`), data || '');
    }
    info(message, data) {
        this.logger.info({
            context: this.context,
            message: message,
            data: data || '',
        });
        console.info(chalk_1.default.cyan(`INFO: ${chalk_1.default.bold(new Date().toISOString())} [${this.context}] ${message}`), data || '');
    }
    log(message, data) {
        this.logger.info({
            context: this.context,
            message: message,
            data: data || '',
        });
        console.log(chalk_1.default.cyan(`LOG: ${chalk_1.default.bold(new Date().toISOString())} [${this.context}] ${message}`), data || '');
    }
}
exports.LoggerUtil = LoggerUtil;
class DataDog {
    constructor(req) {
        try {
            this.req = req;
            this.api = req.originalUrl || req.url;
            const logDirectoryPath = path.resolve(process.cwd(), 'logs');
            const transports = [
                new winston.transports.File({ filename: `${logDirectoryPath}/error.log`, level: 'error' }),
                new winston.transports.File({ filename: `${logDirectoryPath}/combined.log`, level: 'info' }),
            ];
            this.logger = (0, winston_1.createLogger)({
                format: combine(timestamp(), winston_1.format.json(), prettyPrint(), winston_1.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })),
                transports,
            });
        }
        catch (err) {
            console.error(chalk_1.default.red('Error constructing DataDog logger:'), err);
        }
    }
    request() {
        this.req.startTime = Date.now();
        this.req.deviceType = this.req.headers.devicetype;
        if (Object.keys(this.req.body).length > 0) {
            console.log(chalk_1.default.blue(`LOG: ${chalk_1.default.bold(new Date().toISOString())} Request Body: ${JSON.stringify(this.req.body)}`));
        }
    }
    end(status = 200) {
        const elapsedTime = Date.now() - this.req.startTime;
        if (status !== 500) {
            this.logger.log({
                level: 'info',
                message: `API: ${this.api} ${status} +${elapsedTime}ms`,
            });
            console.log(chalk_1.default.green(`LOG: ${chalk_1.default.bold(new Date().toISOString())} API: ${this.api} ${status} +${elapsedTime}ms`));
        }
        else {
            this.logger.error({
                level: 'error',
                message: `API: ${this.api} ${status} +${elapsedTime}ms`,
            });
            console.error(chalk_1.default.red(`LOG: ${chalk_1.default.bold(new Date().toISOString())} API: ${this.api} ${status} +${elapsedTime}ms`));
        }
    }
}
exports.default = DataDog;
