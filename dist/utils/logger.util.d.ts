import winston = require('winston');
import { IRequest } from '../interfaces/req';
export declare class LoggerUtil {
    context: string;
    logger: winston.Logger;
    constructor(context: string);
    error(message: string, error?: any): void;
    warn(message: string, data?: any): void;
    info(message: string, data?: any): void;
    log(message: string, data?: any): void;
}
declare class DataDog {
    private api;
    private logger;
    private req;
    constructor(req: IRequest);
    request(): void;
    end(status?: number): void;
}
export default DataDog;
