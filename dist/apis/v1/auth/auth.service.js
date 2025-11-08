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
const constants_1 = require("../../../constants");
const user_model_1 = require("../../../models/user.model");
const token_model_1 = require("../../../models/token.model");
const jwt_util_1 = require("../../../utils/jwt.util");
const utils_1 = require("../../../utils");
const admin_model_1 = require("../../../models/admin.model");
const password_util_1 = require("../../../utils/password.util");
class AuthService {
    constructor() {
        this.logger = new utils_1.LoggerUtil('AuthService');
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const admin = yield admin_model_1.default.findOne({ email });
            if (!admin)
                return { status: constants_1.HttpStatus.BadRequest, message: 'invalid_credentials' };
            const isMatch = yield password_util_1.default.compare(password, admin.password);
            if (!isMatch)
                return { status: constants_1.HttpStatus.BadRequest, message: 'invalid_credentials' };
            const accessToken = yield this.generateToken({ adminId: admin._id });
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'login_success',
                data: {
                    accessToken
                }
            };
        });
    }
    senOtpLogin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { countryCode, phoneNumber } = payload;
            let cCode = countryCode.replace("+", "");
            let user = yield user_model_1.default.findOne({ countryCode: cCode, phoneNumber });
            if (!user)
                return { status: constants_1.HttpStatus.BadRequest, message: 'user_not_found' };
            const otp = '1111';
            user.otp = otp;
            user.otpExpiresAt = new Date(new Date().setMinutes(new Date().getMinutes() + 10));
            this.logger.warn("Testing ");
            yield user.save();
            return {
                status: constants_1.HttpStatus.Ok, message: 'otp_sent', data: {
                    user: {
                        _id: user._id,
                        countryCode: user.countryCode,
                        phoneNumber: user.phoneNumber,
                        otp: user.otp,
                    }
                }
            };
        });
    }
    verifyOtpLogin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { countryCode, phoneNumber, otp } = payload;
            let cCode = countryCode.replace("+", "");
            const user = yield user_model_1.default.findOne({ countryCode: cCode, phoneNumber });
            if (!user)
                return { status: constants_1.HttpStatus.BadRequest, message: 'user_not_found' };
            if (user.otp !== otp)
                return { status: constants_1.HttpStatus.BadRequest, message: 'invalid_otp' };
            if (user.otpExpiresAt.getTime() < new Date().getTime())
                return { status: constants_1.HttpStatus.Gone, message: 'otp_expired' };
            const accessToken = yield this.generateToken({ userId: user._id });
            return {
                status: constants_1.HttpStatus.Ok,
                message: 'otp_verified',
                data: {
                    user: {
                        _id: user._id,
                        countryCode: user.countryCode,
                        phoneNumber: user.phoneNumber
                    },
                    accessToken
                }
            };
        });
    }
    generateToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.userId) {
                const token = yield token_model_1.default.create({ userId: data.userId });
                const payload = { tid: `${token._id}` };
                return jwt_util_1.default.createJWT(payload, '7d');
            }
            else if (data.adminId) {
                const token = yield token_model_1.default.create({ adminId: data.adminId });
                const payload = { tid: `${token._id}` };
                return jwt_util_1.default.createJWT(payload, '7d');
            }
        });
    }
}
exports.default = new AuthService();
