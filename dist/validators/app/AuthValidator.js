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
const ValidateHelper_1 = require("../../helpers/ValidateHelper");
class AuthValidator {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required()
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                password: Joi.string().required(),
                passwordCurrent: Joi.string().required()
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    verifyAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                token: Joi.string().required(),
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                newPassword: Joi.string().required(),
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new AuthValidator();
