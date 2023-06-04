import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/req.interface';
declare class AuthValidator {
    signUp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    register(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthValidator;
export default _default;
