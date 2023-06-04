import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class AuthController {
    /**
         * @api {post} /api/v1/app/auth/signup
         * @apiHeader {Number} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiName signup
         * @apiGroup App-Auth
         * @apiBody {Number} phoneNumber 9125608540
         * @apiParamExample {json} Request-Body:
         *    {
         *        "phoneNumber":"9125608540"
         *    }
         *
         * @apiSuccessExample {json} Success-Response:
         * {
         *  "status": 200,
         *  "statusText": "SUCCESS",
         *  "message": "User signUp successfully",
         *  "data": {
         *   "user": {
         *    "phoneNumber": 9125608540,
         *    "otp": "73734",
         *    "isApproved": false,
         *    "isActive": false,
         *    "timestamps": "1669630616691",
         *    "_id": "63848b009eca0646c7c6bf33",
         *    "createdAt": "2022-11-28T10:18:40.420Z",
         *    "updatedAt": "2022-11-28T10:18:40.420Z",
         *    "__v": 0
         *   },
         *  "execTime": 66
         *    }
         *    }
         * @apiErrorExample {json} Error-Response1:
         *{"status":409,"statusText":"CONFLICT","message":"User already exists","data":{}}
         *
         */
    SignUp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
         * @api {post} /api/v1/app/auth/verify-otp Otp verify
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......
         * @apiName otp verify
         * @apiGroup App-Auth
         * @apiParamExample {json} Request-Body:
         *  {
         *    "otp":"61474",
         *   "countryCode":"+121",
         *   "phoneNumber":"6697896541"
         *    }
         *
         * @apiSuccessExample {json} Success-Response:
         * {
         *  {
         *  "status": 200,
         *  "statusText": "SUCCESS",
         *  "message": "Otp verified successfully",
         *  "data": {
         *   "user": {
         *     "_id": "639ab74f2160ed41809d7d67",
         *     "countryCode": "+121",
         *     "phoneNumber": "6697896541",
         *     "isApproved": 3,
         *     "isCompleted": false,
         *     "isVerified": true,
         *     "isActive": false,
         *     "timestamps": "1671083848839",
         *     "createdAt": "2022-12-15T05:57:35.258Z",
         *     "updatedAt": "2022-12-15T05:57:35.258Z",
         *     "__v": 0,
         *     "otp": null
         * },
         * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWFiNzY2MjE2MGVkNDE4MDlkN2Q2YiIsImlhdCI6MTY3MTA4Mzg3OSwiZXhwIjoxNzAyNjE5ODc5fQ.f96KRCXdU8hpfHPkNqM82xeOgEOL-V7QvwqEO1WiGXQ",
         * "execTime": 87
         *  }
         *   }
         * }
         *
         */
    OtpVerify(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
         * @api {post} /api/v1/app/auth/resend-otp Resend otp
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiName resend otp
         * @apiGroup App-Auth
         * @apiBody {String} phoneNumber 9125608540.
         *  @apiParamExample {json} Request-Body:
         *    {
         *       "phoneNumber":"9125608540"
         *    }
         *
         * @apiSuccessExample {json} Success-Response:
         * {
         * "statusText": "SUCCESS",
         * "message": "Resend otp successfully",
         * "data": {
         * "_id": "63848b009eca0646c7c6bf33",
         * "phoneNumber": "9125608540",
         * "otp": "80763",
         * "isApproved": true,
         * "isActive": false,
         * "timestamps": "1669630616691",
         * "createdAt": "2022-11-28T10:18:40.420Z",
         * "updatedAt": "2022-11-28T10:18:40.420Z",
         * "__v": 0,
         * "name": "ankit"
         *   }
         *     }
         *
         */
    ResendOtp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
         * @api {post} /api/v1/app/auth/register Register
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiName register
         * @apiGroup App-Auth
         * @apiBody {String} name ankit
         * @apiBody {String} email ankit@123gmail.com
         * @apiParamExample {json} Request-Body:
         *    {
         *      "name":"ankit",
         *      "email":ankit@123gmail.com
         *    }
         *
         * @apiSuccessExample {json} Success-Response:
         * {
         * "status": 200,
         * "statusText": "SUCCESS",
         * "message": "User register successfully",
         * "data": {
         *  "user": {
         *    "_id": "6385920593f55b0b3cb4de14",
         *    "phoneNumber": 9125608530,
         *    "otp": null,
         *    "isApproved": false,
         *    "isCompleted:true,
         *    "isVerified": true,
         *    "isActive": false,
         *    "timestamps": "1669697788189",
         *    "createdAt": "2022-11-29T05:00:53.771Z",
         *    "updatedAt": "2022-11-29T05:00:53.771Z",
         *    "__v": 0,
         *    "name": "ashraf hussain"
         *  },
         *   "execTime": 71
         *  }
         *   }
         */
    Register(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
         * @api {post} /api/v1/app/auth/login Login
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiName login
         * @apiGroup App-Auth
         * @apiBody {String} countryCode +121
         * @apiBody {String} phoneNumber 9125608530
         *
         * @apiParamExample {json} Request-Body:
         *    {
         *      "countryCode" :"+121"
         *      "phoneNumber":"9125608530"
         *    }
         *
         * @apiSuccessExample {json} Success-Response:
         * {
         *  "status": 200,
         *  "statusText": "SUCCESS",
         *  "message": "User approved by admin and login  successfully",
         *   "data": {
         *   "user": {
         *    "_id": "6385920593f55b0b3cb4de14",
         *    "phoneNumber": "9125608530",
         *    "otp": null,
         *    "isApproved": true,
         *    "isVerified": true,
         *    "isActive": false,
         *    "timestamps": "1669697788189",
         *    "createdAt": "2022-11-29T05:00:53.771Z",
         *    "updatedAt": "2022-11-29T05:00:53.771Z",
         *    "__v": 0,
         *    "name": "ashraf hussain"
         *  },
         *  "execTime": 121
         *  }
         *   }
         *
         */
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
