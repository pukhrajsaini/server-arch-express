import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class TestController {
    test(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<ResInterface>;
}
declare const _default: TestController;
export default _default;
