import { IResponse } from '../interfaces/req';
/**
 *
 * @param res
 * @param status
 * @param message
 * @param data
 */
export declare const sendResponse: (res: IResponse, result: {
    status: number;
    message: string;
    data?: any;
}) => void;
