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
exports.checkPhoneNumber = void 0;
const user_model_1 = require("../models/user.model");
const checkPhoneNumber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    const userFound = yield user_model_1.default.findOne({ phoneNumber });
    if (userFound) {
        return res.status(403).json({
            statusCode: 403,
            message: `phone number: ${phoneNumber} is already used`,
        });
    }
    next();
});
exports.checkPhoneNumber = checkPhoneNumber;
