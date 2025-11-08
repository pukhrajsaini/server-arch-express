import { NextFunction } from "express";
import { IRequest, IResponse } from "../../../interfaces";
import adminService from "./admin.service";
import { sendResponse } from "../../../helpers";

class AdminController {


    /** 
     * @api {get} /admins/profile Fetch own profile
     * @apiName admin-profile
     * @apiGroup Admin
     * @apiDescription Fetch own profile by admin with permissions
     * @apiHeader {String} Authorization Admin's access token
     * 
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
    *           "status": 200,
    *           "message": "Admin profile fetched successfully",
    *           "data": {
    *               "admin": [
    *                   {
    *                       "_id": "67a39b456bc9ae04ccb0c807",
    *                       "name": "Saini Dev",
    *                       "email": "saini.dev@gmail.com",
    *                       "role": {
    *                           "_id": "6795a1cce28b3ea866fec49b",
    *                           "name": "SUPER_ADMIN",
    *                           "permissions": [
    *                               "ADMIN",
    *                               "USER",
    *                               "RESTAURANT",
    *                               "DASHBOARD",
    *                               "DEVICE_MANAGEMENT",
    *                               "DEVICE_STATICS",
    *                               "SETTINGS",
    *                               "NOTIFICATION"
    *                           ]
    *                       }
    *                   }
    *               ]
    *           }
    *       }  
    **/
    async myProfile(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const admin = req.admin;
            const result = await adminService.myProfile(admin._id);
            return sendResponse(
                res,
                result
            );
        } catch (error) {
            next(error);
        }
    }


    /**
     * @api {post} /admins Create Admin by admin
     * @apiName create-admin
     * @apiGroup Admin
     * @apiDescription Create Admin by admin
     * @apiHeader {String} Authorization Admin's access token
     * 
     * @apiBody {String} name 
     * @apiBody {String} roleName Role name
     * @apiBody {String} phoneNumber 
     * @apiBody {String} countryCode 
     * @apiBody {String} email 
     * 
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 CREATED
     * {
     *       "status": 201,
     *       "message": "Admin created successfully",
     *       "data": {
     *           "_id": "67ac22537298af7bc80a3582",
     *           "displayId": "1OKY5Q"
     *       }
     *   }
     */
    async create(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const body = req.body;
            const result = await adminService.create(body);
            return sendResponse(
                res,
                result
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * 
     * @api {get} /admins List Admins by admin
     * @apiName list-admins
     * @apiGroup Admin
     * @apiDescription List Admins by admin with pagination
     * @apiHeader {String} Authorization Admin's access token
     * 
     * @apiQuery {Number} page Page number
     * @apiQuery {Number} limit Limit number
     * 
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *  {
     *       "status": 200,
     *       "message": "Admins list",
     *       "data": {
     *           "page": 1,
     *           "limit": 2,
     *           "list": [
     *               {
     *                   "_id": "67a39b456bc9ae04ccb0c807",
     *                   "name": "Saini Dev",
     *                   "email": "saini.dev@gmail.com",
     *                   "createdAt": "2025-02-05T17:09:25.022Z",
     *                   "role": {
     *                       "_id": "6795a1cce28b3ea866fec49b",
     *                       "name": "SUPER_ADMIN"
     *                   }
     *               },
     *               {
     *                   "_id": "67ac22537298af7bc80a3582",
     *                   "name": "Jhon Doe",
     *                   "displayId": "1OKY5Q",
     *                   "email": "jhon,doe@gmail.com",
     *                   "createdAt": "2025-02-12T04:23:47.547Z",
     *                   "role": {
     *                       "_id": "6795a1cce28b3ea866fec49d",
     *                       "name": "OPERATOR"
     *                   }
     *               }
     *           ],
     *           "count": 3
     *       }
     *   }
     */

    async list(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const result = await adminService.list(req.query as any);
            return sendResponse(
                res,
                result
            );
        } catch (error) {
            next(error);
        }
    }


    /**
     * @api {delete} /admins/:id Delete Admin by admin
     * @apiName delete-admin
     * @apiGroup Admin
     * @apiDescription Delete Admin by admin
     * @apiHeader {String} Authorization Admin's access token
     *  @apiParam {String} id Admin's _id
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
     *       "status": 200,
     *       "message": "Admin deleted successfully",
     *   }
     */
    async delete(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await adminService.delete(id, req.admin);
            return sendResponse(
                res,
                result
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {post} /admins/password Change password by admin
     * @apiName change-password
     * @apiGroup Admin
     * @apiDescription Change password by admin
     * @apiHeader {String} Authorization Admin's access token
     * @apiBody {String} currentPassword Current password
     * @apiBody {String} newPassword New password
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
     *       "status": 200,
     *       "message": "Password changed successfully",
     *   }  
     */
    
    async changePassword(req: IRequest, res: IResponse, next: NextFunction) {
        try {
            const body = req.body;
            const result = await adminService.changePassword(body, req.admin._id);
            return sendResponse(
                res,
                result
            );
        } catch (error) {
            next(error);
        }
    }
}

export default new AdminController();