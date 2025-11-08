import { Request, Response } from 'express';
import DataDog from '../utils/logger.util';
import { IUserModel } from '../models/user.model';
import { IAdminModel } from '../models/admin.model';
import { IApiMetadata } from '../middlewares/api-metadata.middleware';



export interface IRequest extends Request {
    startTime: number;
    // admin?: AdminInterface,
    user?: IUserModel;
    files?: any;
    deviceType?: string;
    admin?:IAdminModel;
    metadata?: IApiMetadata
    // session?: SessionInterface
}


/**
 * @interface
 * 
 */
export interface IResponse extends Response {
    /**
     * @type {(message: string) => string} translation message
     */
    __: (message: string) => string;
    logMsg: string;
    logger: DataDog;
}


export interface LogInterface extends Document{
    status: number;
    message: string;
    execTime: number;
    data: any
};