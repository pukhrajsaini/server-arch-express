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
exports.setEnv = setEnv;
const Joi = require("joi");
let env = {
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    MQTT_IP: process.env.MQTT_IP,
    MQTT_URL: process.env.MQTT_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_NAME: process.env.ADMIN_NAME,
    MQTT_USERNAME: process.env.MQTT_USERNAME,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD
};
function setEnv() {
    return __awaiter(this, void 0, void 0, function* () {
        const envVarsSchema = Joi.object({
            DB_URL: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRES_IN: Joi.string().required(),
            MQTT_IP: Joi.string().required(),
            MQTT_URL: Joi.string().required(),
            ADMIN_EMAIL: Joi.string().email().required(),
            ADMIN_PASSWORD: Joi.string().required(),
            ADMIN_NAME: Joi.string().required(),
            MQTT_USERNAME: Joi.string().required(),
            MQTT_PASSWORD: Joi.string().required()
        });
        const validation = yield envVarsSchema.validate(env, { abortEarly: false });
        if (validation.error) {
            const error = validation.error.details.map((e) => e = e.message);
            throw new Error(JSON.stringify({
                message: "Env validation failed",
                data: { error }
            }));
        }
        return true;
    });
}
exports.default = env;
