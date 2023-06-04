import { ReqInterface } from '../interfaces/req.interface';
declare class DataDog {
    hostname: any;
    serviceName: any;
    source: any;
    logger: any;
    constructor(req: ReqInterface);
    error(message: string, error: any): void;
    info(message: string, data: any): void;
    warn(message: string, data: any): void;
}
export default DataDog;
