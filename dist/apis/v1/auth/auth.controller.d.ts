import { NextFunction } from "express";
import { IRequest, IResponse } from "../../../interfaces";
declare class AuthController {
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
    adminLogin(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    /**
     * @api {post} /auth/send-otp Send Otp login
     * @apiName sendOtpLogin
     * @apiGroup Auth
     * @apiDescription get otp for login
     * @apiBody {String} countryCode
     * @apiBody {String} phoneNumber
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "status": 200,
     *           "message": "Otp sent successfully",
     *           "data": {
     *               "user": {
     *                   "_id": "677eb41ebbca1aec86ee1188",
     *                   "phoneNumber": "9882552978",
     *                   "countryCode": "+91",
     *                   "createdAt": "2025-01-08T17:21:34.527Z",
     *                   "updatedAt": "2025-01-12T08:00:32.086Z",
     *                   "__v": 0,
     *                   "otp": "1111",
     *                   "otpExpiresAt": "2025-01-12T08:10:32.084Z"
     *               },
     *               "otp": "1111"
     *           }
     *       }
    **/
    sendOtpLogin(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    /**
     * @api {post} /auth/verify-otp Verify Otp login
     * @apiName verifyOtpLogin
     * @apiGroup Auth
     * @apiDescription verify otp for login
     * @apiBody {String} countryCode
     * @apiBody {String} phoneNumber
     * @apiBody {String} otp
     *
     * @apiParamExample {json} Request-Body Example:
     *     {
     *       "countryCode": "+91",
     *       "phoneNumber": "9414000000",
     *       "otp": "1111"
     *     }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": 200,
     *       "message": "Otp verified successfully",
     *       "data": {
     *           "user": {
     *               "_id": "67854672744c9bd8f55bc71f",
     *               "countryCode": "+91",
     *               "phoneNumber": "9414000000"
     *           },
     *           "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOiI2Nzg1NDY3OTc0NGM5YmQ4ZjU1YmM3MjMiLCJpYXQiOjE3MzY3ODc1NzcsImV4cCI6MTczNjc5MTE3N30.ffqZm3VzL0UhgiFoGyuj4ZLVskMh0kqmw691-sy17Mw"
     *       }
     *   }
    **/
    verifyOtpLogin(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
