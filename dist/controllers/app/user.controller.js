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
const session_model_1 = require("../../models/session.model");
class UserController {
    /**
        * @api {get} /api/v1/app/user/logout logout
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
        * @apiVersion 1.0.0
        * @apiName logout
        * @apiGroup App-User
        * @apiSuccessExample {json} Success-Response:
        * {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "user_logged_out",
        *        "data": {
        *            "execTime": 143
        *        }
        *    }
        *
        * */
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield session_model_1.default.deleteMany({ userId: user._id });
                res.logMsg = `User *${user._id}* logout successfully`;
                return ResponseHelper_1.default.ok(res, res.__('user_logged_out'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
