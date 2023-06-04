import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class AuthController {
    /**
        * @api {post} /api/v1/app/auth/signUp Sign up
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiVersion 1.0.0
        * @apiName signup
        * @apiGroup App-Auth
        * @apiParam {String} name
        * @apiParam {String} email Email Id.
        * @apiParam {String} password
        *
        * @apiParamExample {json} Request-Body:
        *    {
        *      {
        *    "name":"rahul",
        *    "email":"rahul.kannouja@mobilecoderz.com",
        *    "password":"rahul123"
        *   }
        *    }
        *
        * @apiSuccessExample {json} Success-Response:
        * {
        * "status": 201,
        * "statusText": "CREATED",
        * "message": "User signUp successfully",
        *  "data": {
        *   "user": {
        *    "name": "rahul",
        *    "email": "rahul.kannouja@mobilecoderz.com",
        *    "accountType": [],
        *    "accountStatus": "NOT_VERIFIED",
        *    "timestamps": "1663048880290",
        *    "_id": "63201d1dd8a440be9b71d44a",
        *    "createdAt": "2022-09-13T06:03:09.377Z",
        *    "updatedAt": "2022-09-13T06:03:09.377Z",
        *    "__v": 0
        *    },
        *   "execTime": 130
        *  }
        *   }
        *  @apiErrorExample {json} Error-Response1:
        *{"status":409,"statusText":"CONFLICT","message":"User already exists","data":{}}
        *
         */
    signUp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {post} /api/v1/app/auth/login Log In
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiVersion 1.0.0
    * @apiName login
    * @apiGroup App-Auth
    * @apiParam {String} email Email Id.
    * @apiParam {String} password
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *    {
    * {
    * "status": 200,
    * "statusText": "SUCCESS",
    * "message": "Login successfully",
    * "data": {
    *    "user": {
    *        "_id": "63201d1dd8a440be9b71d44a",
    *        "name": "rahul",
    *        "email": "rahul.kannouja@mobilecoderz.com",
    *        "accountType": [],
    *        "accountStatus": "NOT_VERIFIED",
    *        "timestamps": "1663048880290",
    *        "createdAt": "2022-09-13T06:03:09.377Z",
    *        "updatedAt": "2022-09-13T06:03:09.377Z",
    *        "__v": 0
    *    },
    *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjAxZDFkZDhhNDQwYmU5YjcxZDQ0YSIsImVtYWlsIjoicmFodWwua2Fubm91amFAbW9iaWxlY29kZXJ6LmNvbSIsImlhdCI6MTY2MzA0OTAwOSwiZXhwIjoxNjYzMTM1NDA5fQ.qo5Cj-C2xCxVQ1CqoZJXCuyVHy9VZeyZs2Xo6mih3e0",
    *     "execTime": 26
    *    }
    *  }
    *
    * @apiErrorExample {json} Error-Response:
    * HTTP/1.1 400 Bad Request
    *  {
    *        "status": 400,
    *        "message": "Incorrect email or password"
    *  }
    *
    *
    */
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
          * @api {patch} /api/app/app/change-password Change Password
          * @apiHeader {String} App-Version Version Code 1.0.0.
          * @apiVersion 1.0.0
          * @apiName change-password
          * @apiGroup App-Auth
          * @apiParam {String} passwordCurrent
          * @apiParam {String} password
          *
          * @apiSuccessExample {json} Success-Response:
          *     HTTP/1.1 200 OK
          *     {
          *      "statusText": "SUCCESS",
          *        "status": 200,
          *        "message": "password changed successfully"
          *     }
          *
          * @apiErrorExample {json} Error-Response:
          * HTTP/1.1 400 Bad Request
          *  {
          *        "status": 400,
          *        "message": "Invalid password"
          *  }
          *
          *
          **/
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
         * @api {post} /api/v1/app/auth/forgot-password Forgot password
         * @apiHeader {String} [App-Version] Version Code 1.0.0.
         * @apiHeader {String} deviceType 'IOS'
         * @apiVersion 1.0.0
         * @apiName forgot-password
         * @apiGroup App-Auth
         *
         * @apiParam {String} email Email Id.
         *
         * @apiParamExample {json} Request-Body:
         *    {
         *      "email":"rahul.kannouja@mobilecoderz.com"
         *    }
         *
         * @apiSuccessExample {json} Success-Response:
         * {
         *  "status": 200,
         *  "statusText": "SUCCESS",
         *   "message": "Forgot password successfully",
         *    "data": {
         *    "user": "/root/reset-password?resetToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjAxZDFkZDhhNDQwYmU5YjcxZDQ0YSIsInJvbGUiOiJGT1JHT1RfUEFTU1dPUkQiLCJpYXQiOjE2NjMwNjAzMjIsImV4cCI6MTY2MzA2MzkyMn0.3il7QI2ydSDSjfLQ3Fj8lY9jIH-kJSvxbK8fHT_TCCM",
         *    "execTime": 79
         * }
         *   }
         */
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyAccount(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
