import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
/**
    * @api {post} /api/v1/admin/auth/login Log In
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiVersion 1.0.0
    * @apiName login
    * @apiGroup Admin-Auth
    * @apiParam {String} email Email Id.
    * @apiParam {String} password
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *    {
    * "status": 200,
    * "statusText": "SUCCESS",
    * "message": "Admin login successfully",
    * "data": {
    *    "admin": {
    *        "_id": "631b1e161bb91399f3411e87",
    *        "email": "admin123@gmail.com",
    *        "createdAt": "2022-09-09T11:05:58.517Z",
    *        "updatedAt": "2022-09-09T12:49:58.317Z",
    *        "__v": 0
    *    },
    *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWIxZTE2MWJiOTEzOTlmMzQxMWU4NyIsImVtYWlsIjoiYWRtaW4xMjNAZ21haWwuY29tIiwiaWF0IjoxNjYyOTU3MzIwLCJleHAiOjE2NjMwNDM3MjB9.lGDnSSt8NyFzB47Q7_wFnCwrk6OpA0wpCbQCbXS9nDs",
    *    "execTime": 112
    * }
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
declare class AuthController {
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
          * @api {patch} /api/app/admin/change-password Change Password
          * @apiHeader {String} App-Version Version Code 1.0.0.
          * @apiVersion 1.0.0
          * @apiName change-password
          * @apiGroup Admin-Auth
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
            * @api {post} /api/v1/admin/auth/forgot-password Forgot password
            * @apiHeader {String} [App-Version] Version Code 1.0.0.
            * @apiHeader {String} deviceType 'IOS'
            * @apiVersion 1.0.0
            * @apiName forgot-password
            * @apiGroup Admin-Auth
            *
            * @apiParam {String} email Email Id.
            *
            * @apiParamExample {json} Request-Body:
            *    {
            *        "email":"admin123@gmail.com"
            *    }
            *
            * @apiSuccessExample {json} Success-Response:
            * {
            *  "status": 200,
            *  "statusText": "SUCCESS",
            *  "message": "Forgot password successfully",
            *  "data": {
            *  "admin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWViZTgxMWRkMzZkM2FlZDE0MzNhZCIsImVtYWlsIjoiYWRtaW4xMjNAZ21haWwuY29tIiwiaWF0IjoxNjYyOTY2MTQ0LCJleHAiOjE2NjMwNTI1NDR9.ZuIn9v_8nnqgm9FR58RyGPLqvAv4vGkqInazwGUh4o8",
            *  "execTime": 57
            *      }
            *     }
            * @apiErrorExample {json} Error-Response1:
            * {"status":403,"statusText":"FORBIDDEN","message":"No account exists with this email","data":{}}
            *
            */
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
           * @api {patch} /api/v1/app/auth/reset-password Reset password
           * @apiHeader {String} App-Version Version Code 1.0.0.
           * @apiHeader {String} deviceType 'IOS'
           * @apiVersion 1.0.0
           * @apiName reset-password
           * @apiGroup Admin-Auth
           * @apiParam {String} newPassword
           *
           * @apiParamExample {json} Request-Body:
           *    {
           *       "newPassword":"admin124"
           *    }
           *
           * @apiSuccessExample {json} Success-Response:
           *
           * {
           * "status": 200,
           * "statusText": "SUCCESS",
           * "message": "Reset password successfully",
           * "data": {
           * "execTime": 440
           *    }
           *     }
           * @apiErrorExample {json} Error-Response1:
           * {
           *    "status": 400,
           *   "message": "Validation failed",
           *   "data": {
           *      "error": [
           *    "\"newPassword\" is required"
           *     ]
           *  }
           *    }
           */
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
