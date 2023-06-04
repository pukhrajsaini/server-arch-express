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
const AdminModel_1 = require("../../models/AdminModel");
const AuthService_1 = require("../../services/admin/AuthService");
const Auth_1 = require("../../utils/Auth");
// import * as Bcrypt from "bcrypt";
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
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const data = yield AuthService_1.default.login(email, password, res, next);
                res.logMsg = 'Admin login successfully';
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__('admin_login'), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordCurrent = req.body.passwordCurrent;
                const password = req.body.password;
                const admin = yield AdminModel_1.default.findById(req.admin._id).select('+password');
                ;
                const isPasswordCurrentCorrect = yield new Auth_1.Auth().comparePassword(passwordCurrent, admin.password);
                if (!isPasswordCurrentCorrect) {
                    return ResponseHelper_1.default.badRequest(res, res.__('incorrect_password'));
                }
                const encryptedPassword = yield new Auth_1.Auth().encryptPassword(password);
                admin.password = encryptedPassword;
                yield admin.save();
                res.logMsg = `Admin password changed successfully`;
                return ResponseHelper_1.default.ok(res, res.__('admin_password_changed'), { admin });
            }
            catch (err) {
                next(err);
            }
        });
    }
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
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const admin = yield AuthService_1.default.forgotPassword(email, res, next);
                if (admin)
                    return ResponseHelper_1.default.ok(res, res.__('reset_password_link'), { admin });
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPassword = req.body.newPassword;
                const encryptedPassword = yield new Auth_1.Auth().encryptPassword(newPassword);
                const admin = yield AdminModel_1.default.findOne({ email: req.body.email });
                admin.password = encryptedPassword;
                yield admin.save();
                res.logMsg = `Reset password successfully`;
                return ResponseHelper_1.default.ok(res, res.__('reset_password'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
