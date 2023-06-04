import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
declare class AuthValidator {
    signUp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyAccount(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthValidator;
export default _default;
