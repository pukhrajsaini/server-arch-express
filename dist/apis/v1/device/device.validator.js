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
class DeviceValidator {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object({
                id: Joi.string().required(),
                hwVersion: Joi.string().required(),
                swVersion: Joi.string().required(),
                btLoaderVersion: Joi.string().required(),
                name: Joi.string().required(),
                serialNumber: Joi.string().required(),
                notes: Joi.string().optional(),
            });
            const isValid = (0, helpers_1.validate)(req.body, res, schema);
            if (isValid)
                next();
        });
    }
    assign(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object({
                deviceId: Joi.string().required(),
                restaurantId: Joi.string().required(),
                isAssigned: Joi.boolean().required()
            });
            const isValid = (0, helpers_1.validate)(req.body, res, schema);
            if (isValid)
                next();
        });
    }
}
exports.default = new DeviceValidator();
