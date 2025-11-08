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
class UserService {
    userProfile(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, payload), { name: `${payload.firstName} ${payload.lastName}` }), {
                new: true
            });
            return {
                status: constants_1.HttpStatus.Ok,
                message: "user_profile_updated",
                data: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            };
        });
    }
    getUserProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id);
            delete user.otp;
            delete user.otpExpiresAt;
            return {
                status: constants_1.HttpStatus.Ok,
                message: "user_profile_fetched",
                data: {
                    user
                }
            };
        });
    }
}
exports.default = new UserService();
