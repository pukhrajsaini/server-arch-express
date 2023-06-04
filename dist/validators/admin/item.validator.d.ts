import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class Item {
    addItem(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editItem(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    addMovingItem(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    movedItem(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: Item;
export default _default;
