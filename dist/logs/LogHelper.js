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
exports.logFailed = exports.logError = exports.logSuccess = void 0;
const LogTypeConstant_1 = require("./LogTypeConstant");
const LogModel_1 = require("./LogModel");
/**
     *  create success log
     * @param res response object
     * @param execTime Api execution Time
     * @returns nothing.
     */
const logSuccess = (execTime, status, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield LogModel_1.default.create({
            method: res.method,
            execStatus: LogTypeConstant_1.LOG_EXEC_STATUS.success,
            execTime,
            api: res.api,
            status,
            message: res.logMsg
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.logSuccess = logSuccess;
/**
     * create Error log
     * @param req request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
const logError = (req, error, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const execTime = new Date().getTime() - req.startTime;
        let data = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error
        };
        yield LogModel_1.default.create({
            method: req.method,
            execStatus: LogTypeConstant_1.LOG_EXEC_STATUS.error,
            api: req.originalUrl,
            status,
            execTime,
            message: 'Internal server error',
            data: JSON.stringify(data)
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.logError = logError;
/**
     * create Failed log
     * @param req request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
const logFailed = (req, error, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const execTime = new Date().getTime() - req.startTime;
        let data = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error
        };
        yield LogModel_1.default.create({
            method: req.method,
            execStatus: LogTypeConstant_1.LOG_EXEC_STATUS.failed,
            api: req.originalUrl,
            status,
            execTime,
            message: error.message,
            data: JSON.stringify(data)
        });
        return true;
    }
    catch (error) {
        return true;
    }
});
exports.logFailed = logFailed;
