import { NextFunction, Request, Response } from "express";
import * as Joi from 'joi';
import { validate } from "../../../helpers";

class AuthValidator {

    async login(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        const isValid = validate(req.body, res, schema);
        if (isValid) next();
    }

    async sendOtpLogin(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            phoneNumber: Joi.string().required(),
            countryCode: Joi.string().required(),
        });

        const isValid = validate(req.body, res, schema);
        if (isValid) next();
    }

    async verifyOtpLogin(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            phoneNumber: Joi.string().required(),
            countryCode: Joi.string().required(),
            otp: Joi.string().required()
        });

        const isValid = validate(req.body, res, schema);
        if (isValid) next();
    }

}


export default new AuthValidator();