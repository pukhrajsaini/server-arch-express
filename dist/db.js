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
const mongoose_1 = require("mongoose");
const env_1 = require("./environment/env");
const utils_1 = require("./utils");
const role_service_1 = require("./apis/v1/role/role.service");
class Db {
    constructor() {
        this.logger = new utils_1.LoggerUtil('DB');
    }
    connectDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(env_1.default.DB_URL);
                this.logger.log('Database connected');
                yield role_service_1.default.createRole();
                return true;
            }
            catch (error) {
                this.logger.error(error, 'Error to connecting database');
                return false;
            }
        });
    }
}
exports.default = new Db();
