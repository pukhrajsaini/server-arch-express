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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const user_interface_1 = require("../../interfaces/user.interface");
const user_model_1 = require("../../models/user.model");
const user_service_1 = require("../../services/admin/user.service");
class UserController {
    /**
     * @api {post} /api/app/admin/user/list Get User
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiVersion 1.0.0
     * @apiName get-user
     * @apiGroup Admin-User
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *  {
     *   {
     *   "status": 200,
     *   "statusText": "SUCCESS",
     *    "message": "User list fetch successfully",
     *   "data": {
     *   "user": {
     *      "count": 10,
     *      "list": [
     *          {
     *              "_id": "63981945de197586b48899fa",
     *              "name": "sahil",
     *              "email": "sahil123@gmail.com",
     *              "countryCode": "+12",
     *              "phoneNumber": "9125608978",
     *              "userType": 1,
     *              "isApproved": 1,
     *              "isVerified": false,
     *              "isActive": false,
     *              "timestamps": "1670912037664",
     *              "createdAt": "2022-12-13T06:18:45.230Z",
     *              "updatedAt": "2022-12-13T06:18:45.230Z"
     *          },
     *          {
     *              "_id": "639716f997960432c2d36ec1",
     *              "name": "kamal",
     *              "email": "kamal@123gmail.com",
     *              "phoneNumber": "07905222386",
     *              "userType": 1,
     *              "isApproved": 1,
     *              "isVerified": false,
     *              "isActive": false,
     *              "timestamps": "1670837152758",
     *              "createdAt": "2022-12-12T11:56:41.925Z",
     *              "updatedAt": "2022-12-12T11:56:41.925Z"
     *          },
     *          {
     *              "_id": "6396ed03a913302695470d02",
     *              "name": "rakesh",
     *              "email": "rakesh@123gmail.com",
     *              "phoneNumber": "8890503451",
     *              "userType": 1,
     *              "isApproved": 1,
     *              "isVerified": false,
     *              "isActive": false,
     *              "timestamps": "1670826618386",
     *              "createdAt": "2022-12-12T08:57:39.620Z",
     *              "updatedAt": "2022-12-12T08:57:39.620Z"
     *          },
     *          {
     *              "_id": "6396ca1b20fac2bce21c7bf4",
     *              "name": "sahil",
     *              "email": "sahil123@gmail.com",
     *              "phoneNumber": "9125608978",
     *              "userType": 1,
     *              "isApproved": 1,
     *              "isVerified": false,
     *              "isActive": false,
     *              "timestamps": "1670826521321",
     *              "createdAt": "2022-12-12T06:28:43.483Z",
     *              "updatedAt": "2022-12-12T06:28:43.483Z"
     *          },
     *      ]
     *    },
     *  "execTime": 69
     *   }
     *   }
     *   **/
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const user = yield user_service_1.default.list(queryString);
                res.logMsg = `User list fetched successfully`;
                return ResponseHelper_1.default.ok(res, res.__('user_list'), { user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
       * @api {post} /api/v1/admin/user/change-status/id Admin Approve&Reject
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiVersion 1.0.0
       * @apiName approve&reject
       * @apiGroup Admin-Auth
       * @apiBody {String} isApproved 1
       * @apiSuccessExample {json} Success-Response:
       *  {
       *  "status": 200,
       *  "statusText": "SUCCESS",
       *  "message": "User status changed  successfully",
       *  "data": {
       *    "_id": "6396b154999f28da4213f073",
       *    "countryCode": "+121",
       *    "phoneNumber": "7905222385",
       *    "otp": null,
       *    "isApproved": 1,
       *    "isVerified": true,
       *    "isActive": true,
       *    "timestamps": "1670820172845",
       *    "createdAt": "2022-12-12T04:43:00.126Z",
       *    "updatedAt": "2022-12-12T04:43:00.126Z",
       *    "__v": 0,
       *    "email": "jatin123@gmail.com",
       *    "name": "jatin",
       *    "userType": 2
       *  }
       *   }
       */
    userApprove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.params.id;
                const isApproved = req.body.isApproved;
                let user = yield user_model_1.default.findOne({
                    "_id": userId
                });
                user.isApproved = isApproved;
                user.isApproved = user_interface_1.Approved.approved;
                user.save();
                res.logMsg = 'User status changed  successfully';
                return ResponseHelper_1.default.ok(res, res.__('user_changed_status'), user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.default = new UserController();
