import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class UserController {
    /**
        * @api {get} /api/v1/app/user/logout logout
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
        * @apiVersion 1.0.0
        * @apiName logout
        * @apiGroup App-User
        * @apiSuccessExample {json} Success-Response:
        * {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "user_logged_out",
        *        "data": {
        *            "execTime": 143
        *        }
        *    }
        *
        * */
    logout(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: UserController;
export default _default;
