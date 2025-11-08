import { IResponse } from '../interfaces/req';
/**
 * 
 * @param res 
 * @param status 
 * @param message 
 * @param data 
 */
export const sendResponse = (
    res: IResponse,
    result: {
        status: number,
        message: string,
        data?: any
    }) => {
    res.logger.end(result.status);
    res.status(result.status).json({
        status: result.status,
        message: res.__(result.message),
        data: result.data
    })
}
