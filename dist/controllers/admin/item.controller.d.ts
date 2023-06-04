import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class ItemController {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    deleteImage(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ItemController;
export default _default;
