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
const user_service_1 = require("./user.service");
const helpers_1 = require("../../../helpers");
class UserController {
    /**
     * @api {put} /users/profile Update Profile
     * @apiName updateProfile
     * @apiGroup User
     * @apiPermission user
     * @apiDescription Update user profile
     *
     * @apiHeader {String} Authorization User's access token
     * @apiBody {String} firstName
     * @apiBody {String} lastName
     *
     * @apiParamExample {json} Request-Body Example:
     *     {
     *       "firstName": "John",
     *       "lastName": "Doe"
     *     }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": 200,
     *       "message": "Profile updated successfully",
     *       "data": {
     *           "user": {
     *               "_id": "67854672744c9bd8f55bc71f",
     *               "firstName": "John",
     *               "lastName": "Doe"
     *           }
     *       }
     *     }
     */
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const result = yield user_service_1.default.userProfile(req.user._id, body);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.getUserProfile(req.user._id);
                return (0, helpers_1.sendResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
