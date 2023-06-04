"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const UserModel_1 = require("../../models/UserModel");
const AuthService_1 = require("../../services/app/AuthService");
const Auth_1 = require("../../utils/Auth");
class AuthController {
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
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const email = req.body.email;
                const password = req.body.password;
                const encryptedPassword = yield new Auth_1.Auth().encryptPassword(password);
                const isExists = yield UserModel_1.default.findOne({ email: req.body.email });
                if (isExists) {
                    ResponseHelper_1.default.badRequest(res, "User already signUp");
                }
                else {
                    const data = yield AuthService_1.default.SignUp(name, email, encryptedPassword, req, next);
                    if (data) {
                        res.logMsg = `user *${data.user._id}*  user signUp successfully`;
                        return ResponseHelper_1.default.created(res, ('User signUp successfully'), data);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const data = yield AuthService_1.default.login(email, password, res, next);
                if (data)
                    return ResponseHelper_1.default.ok(res, ('Login successfully'), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordCurrent = req.body.passwordCurrent;
                const password = req.body.password;
                const user = yield UserModel_1.default.findById(req.user._id).select('+password');
                ;
                const isPasswordCurrentCorrect = yield new Auth_1.Auth().comparePassword(passwordCurrent, user.password);
                if (!isPasswordCurrentCorrect) {
                    return ResponseHelper_1.default.badRequest(res, res.__('incorrect_password'));
                }
                const encryptedPassword = yield new Auth_1.Auth().encryptPassword(password);
                user.password = encryptedPassword;
                yield user.save();
                res.logMsg = `User password changed successfully`;
                return ResponseHelper_1.default.ok(res, res.__('user_password_changed'), { user });
            }
            catch (err) {
                next(err);
            }
        });
    }
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
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const user = yield AuthService_1.default.forgotPassword(email, res, next);
                if (user)
                    res.logMsg = `Forgot password successfully`;
                return ResponseHelper_1.default.ok(res, res.__('forgot_password'), { user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.token;
                const user = yield AuthService_1.default.verifyAccount(token, res, next);
                if (user) {
                    res.logMsg = `Account verified successfully`;
                    return ResponseHelper_1.default.ok(res, res.__('account_verified'), user);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.body.password;
                const resetToken = req.body.resetToken;
                const data = yield AuthService_1.default.resetPassword(password, resetToken, res, next);
                if (data) {
                    res.logMsg = 'reset password successfully';
                    return ResponseHelper_1.default.ok(res, res.__('password_reset_done'), data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
