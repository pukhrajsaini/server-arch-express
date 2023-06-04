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
const Auth_1 = require("../../utils/Auth");
const Email_1 = require("../../utils/Email");
/**
     *
     * @param queryString
     * @returns
     */
class UserService {
    /**
  * @param email {string} email of user
  * @param password {string} Encrypted password
  * @param next {NextFunction} next function
  * @return {Promise<UserInterface>} new created user
  */
    SignUp(name, email, password, req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.create({
                    name,
                    email,
                    password,
                    req,
                    next
                });
                user.password = undefined;
                return { user };
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{user: UserInterface, token: string}>}
     */
    login(email, password, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({ email });
                if (!user) {
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_email_password'));
                }
                const payload = {
                    id: user._id,
                    email: user.email,
                };
                const token = yield new Auth_1.Auth().getToken(payload, '1d', next);
                user.password = undefined;
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
    /**
     *
     * @param email
     * @param req
     * @param res
     * @param next
     * @returns {Promise<string>}
     */
    forgotPassword(email, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({ email });
                if (!user) {
                    return ResponseHelper_1.default.unAuthorize(res, ('no_account_exist'));
                }
                const resetPasswordToken = yield new Auth_1.Auth().getToken({
                    id: user._id,
                    role: 'FORGOT_PASSWORD'
                }, '1h', next);
                const endPoint = `/root/reset-password?resetToken=${resetPasswordToken}`;
                yield new Email_1.Email(user.email).sendForgetPasswordEmail(resetPasswordToken);
                return endPoint;
            }
            catch (error) {
                next(error);
            }
        });
    }
    resetPassword(password, token, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = yield new Auth_1.Auth().decodeJwt(token);
            if (decoded.role !== 'FORGOT_PASSWORD') {
                return ResponseHelper_1.default.badRequest(res, res.__('invalid_reset_token'));
            }
            const userId = decoded.id;
            const user = yield UserModel_1.default.findById(userId);
            const tokenCreatedTimeDiff = Math.floor(new Date().getTime() / 1000) - decoded.iat;
            console.log('tokenCreatedTimeDiff', tokenCreatedTimeDiff);
            if (tokenCreatedTimeDiff > 10 * 60) {
                return ResponseHelper_1.default.expired(res, res.__('reset_token_expired'));
            }
            const encryptedPassword = yield new Auth_1.Auth().encryptPassword(password);
            const payload = {
                id: user._id,
                email: user.email,
            };
            const newToken = yield new Auth_1.Auth().getToken(payload, '1d', next);
            user.password = encryptedPassword;
            yield user.save();
            user.password = undefined;
            return {
                user,
                token: newToken
            };
        });
    }
    /**
      *
      * @param token
      * @param res
      * @param next
      * @returns {Promise<string>}
      */
    verifyAccount(token, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = yield new Auth_1.Auth().decodeJwt(token);
            if (decoded.role !== 'VERIFY_ACCOUNT') {
                return ResponseHelper_1.default.badRequest(res, res.__('invalid_verification_token'));
            }
            const userId = decoded.id;
            const user = yield UserModel_1.default.findById(userId);
            const tokenCreatedTimeDiff = Math.floor(new Date().getTime() / 1000) - decoded.iat;
            console.log(tokenCreatedTimeDiff);
            if (tokenCreatedTimeDiff > 10 * 60) {
                return ResponseHelper_1.default.expired(res, res.__('verification_token_expired'));
            }
            user.isEmailVerified = true;
            user.isAccountActive = true;
            yield user.save();
            user.password = undefined;
            return {
                user
            };
        });
    }
}
exports.default = new UserService();
