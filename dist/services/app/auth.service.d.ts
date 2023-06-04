import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import { ResInterface } from "../../interfaces/req.interface";
import { UserInterface } from "../../interfaces/user.interface";
/**
   * @param phoneNumber {number} phoneNumber of user
   * @param otp {string} otp of user
   * @param next {NextFunction} next function
   * @return {Promise<UserInterface>} new created user
   */
declare class AuthService {
    SignUp(countryCode: string, phoneNumber: string, otp: string, next: NextFunction): Promise<{
        user: UserInterface;
    } | void>;
    /**
    * @param name {string} name of user
    * @param otp {string} otp of user
    * @param next {NextFunction} next function
    * @return {Promise<UserInterface>} new created user
    */
    Register(_id: string | ObjectId, name: string, email: string, next: NextFunction): Promise<{
        user: UserInterface;
    } | void>;
    otpverify(otp: string, countryCode: string, phoneNumber: string, deviceType: string, res: ResInterface, next: NextFunction): Promise<{
        user: UserInterface;
        token: string;
    } | void>;
}
declare const _default: AuthService;
export default _default;
