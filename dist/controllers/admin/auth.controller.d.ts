import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class AuthController {
    /**
      * @api {post} /api/v1/admin/auth/login Log In
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiVersion 1.0.0
      * @apiName login
      * @apiGroup Admin-Auth
      * @apiBody {String} email Email Id.
      * @apiBody {String} password
      * @apiSuccessExample {json} Success-Response:
      *    {
      * "status": 200,
      * "statusText": "SUCCESS",
      * "message": "Admin login successfully",
      * "data": {
      *    "admin": {
      *        "_id": "637217547d1d0775c4bf084f",
      *        "email": "admin@traytracker.com",
      *        "name": "Tray&Tracker",
      *        "createdAt": "2022-11-14T10:24:20.711Z",
      *        "updatedAt": "2022-11-15T11:40:01.872Z",
      *        "__v": 0
      *    },
      *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIxNzU0N2QxZDA3NzVjNGJmMDg0ZiIsImVtYWlsIjoiYWRtaW5AdHJheXRyYWNrZXIuY29tIiwiaWF0IjoxNjY4NTc0NDI3LCJleHAiOjE2Njg2NjA4Mjd9.q8Re91EXeguty6YgsMkDedk-SrOeTLQfPelTo2G7yiM",
      *    "execTime": 111
      *   }
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
          * @api {post} /api/app/admin/change-password Change Password
          * @apiHeader {String} App-Version Version Code 1.0.0.
          * @apiVersion 1.0.0
          * @apiName change-password
          * @apiGroup Admin-Auth
          * @apiBody {String} passwordCurrent
          * @apiBody {String} password
          * @apiSuccessExample {json} Success-Response:
          *     HTTP/1.1 200 OK
          *     {
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
          * @api {post} /api/app/admin/approved Admin Approved
          * @apiHeader {String} App-Version Version Code 1.0.0.
          * @apiVersion 1.0.0
          * @apiName admin-approved
          * @apiGroup Admin-Auth
          * @apiBody {String} userId
          * @apiSuccessExample {json} Success-Response:
          *     HTTP/1.1 200 OK
          *   {
          *  "status": 200,
          *  "statusText": "SUCCESS",
          *  "message": "User approved by admin",
          *  "data": {
          *  "user": {
          *      "_id": "63930dd6dda7a2035d4c280a",
          *      "name": "ashraf",
          *      "email": "ashraf123@gmail.com",
          *      "countryCode": "+12",
          *      "phoneNumber": "9125608537",
          *      "userType": 1,
          *      "isApproved": 1,
          *      "isVerified": false,
          *      "isActive": false,
          *      "timestamps": "1670581712778",
          *      "createdAt": "2022-12-09T10:28:38.585Z",
          *      "updatedAt": "2022-12-09T10:28:38.585Z",
          *      "__v": 0
          *  },
          *  "execTime": 73
          *   }
          *   }
          **
          **/
    adminApproved(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
        * @api {post} /api/app/admin/forgot-password Forgot Password
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiVersion 1.0.0
        * @apiName forgot-password
        * @apiGroup Admin-Auth
        * @apiBody {String} email admin@traytracker.com
        * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *     {
        *   "status": 200,
        *   "statusText": "SUCCESS",
        *  "message": "Reset password sent link successfully",
        *   "data": {
        *  "endPoint": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIxNzU0N2QxZDA3NzVjNGJmMDg0ZiIsInJvbGUiOiJGT1JHT1RfUEFTU1dPUkQiLCJpYXQiOjE2NzA5MTQ4MzgsImV4cCI6MTY3MDkxODQzOH0.vG_L7KW9_TT8KllOfQGW21N9IFqiQTtkWUqmrElONVA",
        *  "execTime": 41
        *  }
        *  }
        *
        *
        **/
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
          * @api {post} /api/app/admin/reset-password Reset Password
          * @apiHeader {String} App-Version Version Code 1.0.0.
          * @apiVersion 1.0.0
          * @apiName reset-password
          * @apiGroup Admin-Auth
          * @apiBody {String} password
          *@apiBody {String} token
          * @apiSuccessExample {json} Success-Response:
          *     HTTP/1.1 200 OK
          *   {
          *   "status": 200,
          *   "statusText": "SUCCESS",
          *   "message": "Reset password successfully",
          *   "data": {
          *   "admin": {
          *      "_id": "637217547d1d0775c4bf084f",
          *      "email": "admin@traytracker.com",
          *      "name": "Tray&Tracker",
          *      "createdAt": "2022-11-14T10:24:20.711Z",
          *      "updatedAt": "2022-12-13T07:04:16.865Z",
          *      "__v": 0
          *  },
          *  "execTime": 143
          *   }
          *  }
          *
          **/
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
