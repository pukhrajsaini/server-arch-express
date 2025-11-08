import { NextFunction } from "express";
import { IRequest, IResponse } from "../interfaces";
declare class AuthMiddleware {
    user(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    admin(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
}
declare const authenticate: AuthMiddleware;
export default authenticate;
