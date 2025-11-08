import { NextFunction } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../../helpers";
import { IRequest, IResponse } from "../../../interfaces";


class AuthController {


    /** 
     * @api {post} /auth/login Admin login
     * @apiName login
     * @apiGroup Auth
     * @apiDescription admin login
     * @apiBody {String} email 
     * @apiBody {String} password
     * 
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "status": 200,
     *      "message": "Login successfully",
     *      "data": {
     *          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOiI2N2EzOTYzMzA4OTA2NDU0MjNjMTFkMTEiLCJpYXQiOjE3Mzg3NzQwNjcsImV4cCI6MTczODg2MDQ2N30.ijCuhz3rriMC6pSFuSmEIVzAqEBwPjpGl7mZ6PDyxcA"
     *      }
     *  }   
    **/
    async adminLogin(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const body = req.body;
            const result = await authService.login(body)
            return sendResponse(
                res,
                result
            );
        } catch (error) {
            next(error);
        }
    }




  



}

export default new AuthController();