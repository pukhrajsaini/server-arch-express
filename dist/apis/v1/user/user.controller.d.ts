import { NextFunction } from "express";
import { IRequest, IResponse } from "../../../interfaces";
declare class UserController {
    /**
     * @api {put} /users/profile Update Profile
     * @apiName updateProfile
     * @apiGroup User
     * @apiPermission user
     * @apiDescription Update user profile
     *
     * @apiHeader {String} Authorization User's access token
     * @apiBody {String} firstName
     * @apiBody {String} lastName
     *
     * @apiParamExample {json} Request-Body Example:
     *     {
     *       "firstName": "John",
     *       "lastName": "Doe"
     *     }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": 200,
     *       "message": "Profile updated successfully",
     *       "data": {
     *           "user": {
     *               "_id": "67854672744c9bd8f55bc71f",
     *               "firstName": "John",
     *               "lastName": "Doe"
     *           }
     *       }
     *     }
     */
    updateProfile(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    getProfile(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
}
declare const _default: UserController;
export default _default;
