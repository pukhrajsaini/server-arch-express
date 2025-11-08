import { NextFunction } from 'express';
import { IRequest, IResponse } from '../../../interfaces';
declare class RestaurantValidator {
    create(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
}
declare const _default: RestaurantValidator;
export default _default;
