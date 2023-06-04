import { NextFunction } from "express";
import { AdminInterface } from "../../interfaces/admin.interface";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class AuthService {
    createAdmin(): Promise<void>;
    /**
     *
     * @param email {String} admin email
     * @param password {Password} admin password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(email: string, password: string, res: ResInterface, next: NextFunction): Promise<{
        admin: AdminInterface;
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
    forgotPassword(email: string, req: ReqInterface, res: ResInterface, next: NextFunction): Promise<string | void>;
    /**
     *
     * @param password
     * @param token
     * @param res
     * @param next
     * @returns {Promise<{admin: AdminInterface}>}
     */
    resetPassword(password: string, token: string, res: ResInterface, next: NextFunction): Promise<{
        admin: AdminInterface;
    } | void>;
}
declare const _default: AuthService;
export default _default;
