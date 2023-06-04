import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class IndividualUserController {
    /**
      * @api {post} /api/app/admin/individualuser/add Add Individual User
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiVersion 1.0.0
      * @apiName add-individualuser
      * @apiGroup Admin-User
      * @apiBody {String} name sahil
      * @apiBody {String} email sahil123@gmail.com
      * @apiBody {String} phoneNumber 9125608978
      * @apiSuccessExample {json} Success-Response:
      *     HTTP/1.1 200 OK
      *  {
      *  "status": 201,
      *  "statusText": "CREATED",
      *  "message": "IndividualUser added successfully ",
      *  "data": {
      *  "user": {
      *      "name": "sahil",
      *      "email": "sahil123@gmail.com",
      *      "countryCode": "+12",
      *      "phoneNumber": "9125608978",
      *      "userType": 1,
      *      "isApproved": 1,
      *      "isVerified": false,
      *      "isActive": false,
      *      "timestamps": "1670912037664",
      *      "_id": "63981945de197586b48899fa",
      *      "createdAt": "2022-12-13T06:18:45.230Z",
      *      "updatedAt": "2022-12-13T06:18:45.230Z",
      *      "__v": 0
      *  },
      *  "execTime": 78
      *   }
      *    }

      */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
      * @api {post} /api/app/admin/individualuser/edit/id Edit Individual User
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiVersion 1.0.0
      * @apiName edit-individualuser
      * @apiGroup Admin-User
      * @apiBody {String} name
      * @apiBody {String} email
      * @apiBody {String} phoneNumber
      * @apiSuccessExample {json} Success-Response:
      *     HTTP/1.1 200 OK
      *  {
      *   {
      *  "status": 200,
      *  "statusText": "SUCCESS",
      *  "message": "IndividualUser updated successfully",
      *  "data": {
      *  "user": {
      *      "_id": "63930aec81b326b2d1d0e5ff",
      *      "countryCode": "+12",
      *      "phoneNumber": "9125618566",
      *      "otp": null,
      *      "isApproved": 1,
      *      "isVerified": true,
      *      "isActive": false,
      *      "timestamps": "1670580939083",
      *      "createdAt": "2022-12-09T10:16:12.195Z",
      *      "updatedAt": "2022-12-09T10:16:12.195Z",
      *      "__v": 0,
      *      "email": "rohan123@gmail.com",
      *      "name": "rohan",
      *      "userType": 2
      *    },
      *    "execTime": 68
      *  }
      *   }
      * */
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
     * @api {post} /api/app/admin/individualuser/list List Individual User
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiVersion 1.0.0
     * @apiName list-individualuser
     * @apiGroup Admin-User
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *  {
     *    {
     *    "status": 200,
     *   "statusText": "SUCCESS",
     *   "message": "IndividualUser list fetched successfully",
     *    "data": {
     *   "user": {
     *      "count": 9,
     *      "list": [
     *          {
     *              "_id": "639716f997960432c2d36ec1",
     *              "name": "pukhraj",
     *              "email": "pukhraj123@gmal.com",
     *              "phoneNumber": "9930045204",
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
     *       ]
     *     },
     *     "execTime": 70
     *   }
     *   }
     *   **/
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: IndividualUserController;
export default _default;
