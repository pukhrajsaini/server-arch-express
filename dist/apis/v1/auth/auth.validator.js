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
const Joi = require("joi");
const helpers_1 = require("../../../helpers");
class AuthValidator {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required()
            });
            const isValid = (0, helpers_1.validate)(req.body, res, schema);
            if (isValid)
                next();
        });
    }
    sendOtpLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                phoneNumber: Joi.string().required(),
                countryCode: Joi.string().required(),
            });
            const isValid = (0, helpers_1.validate)(req.body, res, schema);
            if (isValid)
                next();
        });
    }
    verifyOtpLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                phoneNumber: Joi.string().required(),
                countryCode: Joi.string().required(),
                otp: Joi.string().required()
            });
            const isValid = (0, helpers_1.validate)(req.body, res, schema);
            if (isValid)
                next();
        });
    }
}
exports.default = new AuthValidator();
