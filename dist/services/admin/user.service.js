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
const user_model_1 = require("../../models/user.model");
const api_features_1 = require("../../utils/api-features");
class UserService {
    /**
   * @description listing of user
   * @param queryString req query object
   * @params User id of user
   * @returns
   */
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = user_model_1.default.find({ isDeleted: false, });
            const countFeature = new api_features_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['name'])
                .getCount();
            const lisQuery = user_model_1.default.find({ isDeleted: false, });
            const listFeature = new api_features_1.ApiFeatures(lisQuery, queryString)
                .filtering()
                .searching(['name'])
                .sorting('-createdAt')
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { count, list };
        });
    }
    /**
  * @description get user by id
  * @param id {String} user id for fetching user
  * @returns {Promise<UserInterface>} user data by id
  */
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield user_model_1.default.findById(id);
            return userData;
        });
    }
}
exports.default = new UserService();
