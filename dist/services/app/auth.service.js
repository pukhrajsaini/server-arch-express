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
const user_interface_1 = require("../../interfaces/user.interface");
const session_model_1 = require("../../models/session.model");
const user_model_1 = require("../../models/user.model");
const auth_1 = require("../../utils/auth");
/**
   * @param phoneNumber {number} phoneNumber of user
   * @param otp {string} otp of user
   * @param next {NextFunction} next function
   * @return {Promise<UserInterface>} new created user
   */
class AuthService {
    SignUp(countryCode, phoneNumber, otp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.create({
                    countryCode,
                    phoneNumber,
                    otp,
                });
                return { user };
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
    * @param name {string} name of user
    * @param otp {string} otp of user
    * @param next {NextFunction} next function
    * @return {Promise<UserInterface>} new created user
    */
    Register(_id, name, email, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findByIdAndUpdate(_id, {
                    name,
                    email,
                    userType: user_interface_1.UserType.selfRegister,
                    isCompleted: true
                }, {
                    new: true
                });
                return { user };
            }
            catch (error) {
                next(error);
            }
        });
    }
    otpverify(otp, countryCode, phoneNumber, deviceType, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ countryCode, phoneNumber });
                if (!user)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_phone_number'));
                if (user.otp !== otp)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_otp'));
                user.countryCode = countryCode;
                user.phoneNumber = phoneNumber;
                user.otp = null;
                user.isVerified = true;
                const session = yield session_model_1.default.create({
                    user: user._id,
                    deviceType,
                });
                const payload = {
                    id: session._id,
                    deviceType,
                };
                const token = yield new auth_1.Auth().getToken(payload, '365d', next);
                yield user.save();
                return {
                    user,
                    token
                };
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthService();
