import { NextFunction } from "express";
import responseHelper from "../../helpers/response.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class TestController {
    async test(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
           
            const logger = res.logger;

            logger.warn('hello debug', {});
            res.logMsg = 'Hello Successful log'
            return responseHelper.ok(res, res.__('ok'), {})
        } catch (error) {
            next(error);
        }
    }
}

export default new TestController();