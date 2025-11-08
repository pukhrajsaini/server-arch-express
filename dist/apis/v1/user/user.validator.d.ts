import { NextFunction, Request, Response } from "express";
declare class UserValidator {
    updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    edit(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: UserValidator;
export default _default;
