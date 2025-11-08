import { Response } from "express";
import Joi = require("joi");
export declare const validate: (body: any, res: Response, schema: Joi.Schema) => Promise<boolean>;
