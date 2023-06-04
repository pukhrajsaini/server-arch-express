import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import { UserInterface } from "../../interfaces/UserInterface";
/**
     *
     * @param queryString
     * @returns
     */
declare class UserService {
    /**
  * @param email {string} email of user
  * @param password {string} Encrypted password
  * @param next {NextFunction} next function
  * @return {Promise<UserInterface>} new created user
  */
    SignUp(name: string, email: string, password: string, req: ReqInterface, next: NextFunction): Promise<{
        user: UserInterface;
    } | void>;
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{user: UserInterface, token: string}>}
     */
    login(email: string, password: string, res: ResInterface, next: NextFunction): Promise<{
        user: UserInterface;
        token: string;
    } | void>;
    /**
     *
     * @param email
     * @param req
     * @param res
     * @param next
     * @returns {Promise<string>}
     */
    forgotPassword(email: string, res: ResInterface, next: NextFunction): Promise<string | void>;
    resetPassword(password: string, token: string, res: ResInterface, next: NextFunction): Promise<{
        user: UserInterface;
        token: string;
    } | void>;
    /**
      *
      * @param token
      * @param res
      * @param next
      * @returns {Promise<string>}
      */
    verifyAccount(token: string, res: ResInterface, next: NextFunction): Promise<{
        user: UserInterface;
    } | void>;
}
declare const _default: UserService;
export default _default;
