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
const Auth_1 = require("../../utils/Auth");
const Email_1 = require("../../utils/Email");
class AuthService {
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isAdmin = yield AdminModel_1.default.findOne({ email: 'admin123@gmail.com' });
                if (isAdmin) {
                    console.log('Admin Exist');
                }
                else {
                    const encryptedPassword = yield new Auth_1.Auth().encryptPassword('admin123');
                    isAdmin = yield AdminModel_1.default.create({
                        email: 'admin123@gmail.com',
                        password: encryptedPassword
                    });
                    console.log('Admin created');
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    ;
    /**
     *
     * @param email {String} admin email
     * @param password {Password} admin password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(email, password, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield AdminModel_1.default.findOne({ email });
                if (!admin) {
                    return ResponseHelper_1.default.badRequest(res, ('invalid_email_password'));
                }
                const isPasswordCorrect = yield new Auth_1.Auth().comparePassword(password, admin.password);
                if (!isPasswordCorrect) {
                    return ResponseHelper_1.default.badRequest(res, ('invalid_email_password'));
                }
                const payload = {
                    id: admin._id,
                    email: admin.email,
                };
                const token = yield new Auth_1.Auth().getToken(payload, '1d', next);
                admin.password = undefined;
                return {
                    admin,
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
                const admin = yield AdminModel_1.default.findOne({ email });
                if (!admin) {
                    return ResponseHelper_1.default.unAuthorize(res, ('no_account_exist'));
                }
                const resetPasswordToken = yield new Auth_1.Auth().getToken({
                    id: admin._id,
                    role: 'FORGOT_PASSWORD'
                }, '1h', next);
                const endPoint = `/root/reset-password?resetToken=${resetPasswordToken}`;
                yield new Email_1.Email(admin.email).sendForgetPasswordEmail(resetPasswordToken);
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
            const adminId = decoded.id;
            const admin = yield AdminModel_1.default.findById(adminId);
            const tokenCreatedTimeDiff = Math.floor(new Date().getTime() / 1000) - decoded.iat;
            console.log('tokenCreatedTimeDiff', tokenCreatedTimeDiff);
            if (tokenCreatedTimeDiff > 10 * 60) {
                return ResponseHelper_1.default.expired(res, res.__('reset_token_expired'));
            }
            const encryptedPassword = yield new Auth_1.Auth().encryptPassword(password);
            const payload = {
                id: admin._id,
                email: admin.email,
            };
            const newToken = yield new Auth_1.Auth().getToken(payload, '1d', next);
            admin.password = encryptedPassword;
            yield admin.save();
            admin.password = undefined;
            return {
                admin,
                token: newToken
            };
        });
    }
}
exports.default = new AuthService();
