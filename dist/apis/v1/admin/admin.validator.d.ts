import { NextFunction, Request, Response } from "express";
declare class AdminValidator {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    changePassword(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: AdminValidator;
export default _default;
