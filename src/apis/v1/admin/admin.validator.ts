import { NextFunction, Request, Response } from "express";
import * as Joi from 'joi';
import { validate } from "../../../helpers";

class AdminValidator {
    async create(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            roleName: Joi.string().required(),
            phoneNumber: Joi.string().optional(),
            countryCode: Joi.string().optional(),
            email: Joi.string().required(),
        });

        const isValid = validate(req.body, res, schema);
        if (isValid) next();
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            currentPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
        });

        const isValid = validate(req.body, res, schema);
        if (isValid) next();
    }
}


export default new AdminValidator();