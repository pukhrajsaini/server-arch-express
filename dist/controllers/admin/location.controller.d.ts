import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class LocationController {
    addLocation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: LocationController;
export default _default;
