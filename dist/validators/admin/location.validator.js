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
class Location {
    addLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                locationName: Joi.string().required(),
                locationType: Joi.string().required(),
                locationAddress: Joi.string().required(),
                locationPhoneNumber: Joi.string().required(),
                locationEmail: Joi.string().email().required(),
                custom1: Joi.string().optional(),
                custom2: Joi.string().optional(),
                geolocation: Joi.object().keys({
                    latitude: Joi.string().required(),
                    longitude: Joi.string().required()
                }).required(),
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new Location();
