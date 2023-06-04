import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class Location {
    addLocation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: Location;
export default _default;
