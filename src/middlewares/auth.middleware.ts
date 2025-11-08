import { NextFunction } from "express";
import { sendResponse } from "../helpers";
import { IRequest, IResponse } from "../interfaces";
import { HttpStatus } from "../constants";
import jwtUtil from "../utils/jwt.util";
import TokenModel from "../models/token.model";
import AdminModel from "../models/admin.model";
import { ApiAccess } from "../apis/api.constant";
import RoleModel, { IPermissions } from "../models/role.model";

class AuthMiddleware {

    async user(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const token = req.headers['authorization'] as string;

            if (!token) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'unauthorized'
            });
            const decoded = jwtUtil.decodeJwt(token.split(' ')[1]);
            const { tid } = decoded;
            const tokenData = await TokenModel.findOne({ _id: tid });
            console.log('tokenData', tokenData);
            if (!tokenData || !tokenData.isActive) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'unauthorized'
            });

            // const user = await UserModel.findOne({ _id: tokenData.userId });
            // if (!user) return sendResponse(
            //     res, {
            //     status: HttpStatus.Unauthorized,
            //     message: 'unauthorized'
            // });

            // if (!user.isActive) return sendResponse(
            //     res, {
            //     status: HttpStatus.Unauthorized,
            //     message: 'user_inactive'
            // });

            // if (user.isDelete) return sendResponse(
            //     res, {
            //     status: HttpStatus.Unauthorized,
            //     message: 'user_does_not_exist'
            // });

            // req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
    async admin(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const token = req.headers['authorization'] as string;

            if (!token) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'unauthorized'
            });
            const decoded = jwtUtil.decodeJwt(token.split(' ')[1]);
            const { tid } = decoded;
            const tokenData = await TokenModel.findOne({ _id: tid });
            if (!tokenData || !tokenData.isActive) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'unauthorized'
            });

            if (!tokenData.adminId) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'unauthorized'
            });

            const apiMetadata = req.metadata;
            if (![ApiAccess.Admin, ApiAccess.Global].includes(apiMetadata.access))
                return sendResponse(
                    res, {
                    status: HttpStatus.Unauthorized,
                    message: 'not_permitted'
                }
                );


            const admin = await AdminModel.findOne({ _id: tokenData.adminId });

            if (!admin) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'unauthorized'
            });

            if (!admin.isActive) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'admin_inactive'
            });

            if (admin.isDeleted) return sendResponse(
                res, {
                status: HttpStatus.Unauthorized,
                message: 'admin_does_not_exist'
            });

            if (apiMetadata.access === ApiAccess.Global) {
                req.admin = admin;
                next();
            } else {
                const role = await RoleModel.findOne({ _id: admin.roleId });

                const permissions: IPermissions[] = role.permissions;
                if (!permissions.some((permission) => (permission.entity === apiMetadata.module && permission.actions.includes(apiMetadata.action)))) return sendResponse(
                    res, {
                    status: HttpStatus.Unauthorized,
                    message: 'not_permitted'
                }
                );

                req.admin = admin;
                next();

            }

        } catch (error) {
            next(error);
        }
    }


}

const authenticate = new AuthMiddleware();
export default authenticate;