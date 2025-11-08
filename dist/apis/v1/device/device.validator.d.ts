import { IRequest, IResponse } from '../../../interfaces';
import { NextFunction } from 'express';
declare class DeviceValidator {
    create(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    assign(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
}
declare const _default: DeviceValidator;
export default _default;
