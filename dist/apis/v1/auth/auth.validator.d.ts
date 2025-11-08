import { NextFunction, Request, Response } from "express";
declare class AuthValidator {
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    sendOtpLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyOtpLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: AuthValidator;
export default _default;
