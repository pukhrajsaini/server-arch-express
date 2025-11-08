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
const auth_service_1 = require("./auth.service");
const helpers_1 = require("../../../helpers");
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
    adminLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const result = yield auth_service_1.default.login(body);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    sendOtpLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const result = yield auth_service_1.default.senOtpLogin(body);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    verifyOtpLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const result = yield auth_service_1.default.verifyOtpLogin(body);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
