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
class RestaurantValidator {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object({
                name: Joi.string().required(),
                administrators: Joi.array().items(Joi.object({
                    name: Joi.string().required(),
                    countryCode: Joi.string().required(),
                    phoneNumber: Joi.string().required(),
                })),
                owner: Joi.object({
                    name: Joi.string().required(),
                    countryCode: Joi.string().required(),
                    phoneNumber: Joi.string().required(),
                }),
                streetNumber: Joi.string().required(),
                streetName: Joi.string().required(),
                city: Joi.string().required(),
                postalCode: Joi.string().required(),
            });
            const isValid = (0, helpers_1.validate)(req.body, res, schema);
            if (isValid)
                next();
        });
    }
}
exports.default = new RestaurantValidator();
