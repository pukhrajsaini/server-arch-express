import { createLogger, format } from 'winston';
import winston = require('winston');
import path = require('path');
import { IRequest } from '../interfaces/req';
const { combine, timestamp, prettyPrint } = format;
import chalk from 'chalk';

export class LoggerUtil {
    context: string;
    logger: winston.Logger;

    constructor(context: string) {
        this.context = context;
        const logDirectoryPath = path.resolve(process.cwd(), 'logs');
        const transports: any = [
            new winston.transports.File({ filename: `${logDirectoryPath}/error.log`, level: 'error' }),
            new winston.transports.File({ filename: `${logDirectoryPath}/combined.log`, level: 'info' }),
        ];

        this.logger = createLogger({
            format: combine(
                timestamp(),
                format.json(),
                prettyPrint(),
                format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
            ),
            transports,
        });
    }

    error(message: string, error?: any): void {
        this.logger.error({
            context: this.context,
            message: message,
            error: error,
        });
        console.error(chalk.red(`ERROR: ${chalk.bold(new Date().toISOString())} [${this.context}] ${message}`), chalk.red(error));
    }

    warn(message: string, data?: any): void {
        this.logger.warn({
            context: this.context,
            message: message,
            data: data || '',
        });
        console.warn(chalk.yellow(`WARN: ${chalk.bold(new Date().toISOString())} [${this.context}] ${message}`), data || '');
    }

    info(message: string, data?: any): void {
        this.logger.info({
            context: this.context,
            message: message,
            data: data || '',
        });
        console.info(chalk.cyan(`INFO: ${chalk.bold(new Date().toISOString())} [${this.context}] ${message}`), data || '');
    }

    log(message: string, data?: any): void {
        this.logger.info({
            context: this.context,
            message: message,
            data: data || '',
        });
        console.log(chalk.cyan(`LOG: ${chalk.bold(new Date().toISOString())} [${this.context}] ${message}`), data || '');
    }
}

class DataDog {
    private api: string;
    private logger: winston.Logger;
    private req: IRequest;

    constructor(req: IRequest) {
        try {
            this.req = req;
            this.api = req.originalUrl || req.url;

            const logDirectoryPath = path.resolve(process.cwd(), 'logs');
            const transports: any = [
                new winston.transports.File({ filename: `${logDirectoryPath}/error.log`, level: 'error' }),
                new winston.transports.File({ filename: `${logDirectoryPath}/combined.log`, level: 'info' }),
            ];

            this.logger = createLogger({
                format: combine(
                    timestamp(),
                    format.json(),
                    prettyPrint(),
                    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
                ),
                transports,
            });
        } catch (err) {
            console.error(chalk.red('Error constructing DataDog logger:'), err);
        }
    }

    request() {
        this.req.startTime = Date.now();
        this.req.deviceType = this.req.headers.devicetype as string;
        if(Object.keys(this.req.body).length > 0) {
            console.log(chalk.blue(`LOG: ${chalk.bold(new Date().toISOString())} Request Body: ${JSON.stringify(this.req.body)}`));
        }
    }

    end(status: number = 200): void {
        const elapsedTime = Date.now() - this.req.startTime;
        if (status !== 500) {
            this.logger.log({
                level: 'info',
                message: `API: ${this.api} ${status} +${elapsedTime}ms`,
            })
            console.log(chalk.green(`LOG: ${chalk.bold(new Date().toISOString())} API: ${this.api} ${status} +${elapsedTime}ms`));
        } else {
            this.logger.error({
                level: 'error',
                message: `API: ${this.api} ${status} +${elapsedTime}ms`,
            })
            console.error(chalk.red(`LOG: ${chalk.bold(new Date().toISOString())} API: ${this.api} ${status} +${elapsedTime}ms`));
        }
    }
}

export default DataDog;
