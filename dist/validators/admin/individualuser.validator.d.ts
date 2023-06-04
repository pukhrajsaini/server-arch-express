import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class IndividualUser {
    addindividualUser(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editindividualUser(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: IndividualUser;
export default _default;
