"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
/**
 *
 * @param res
 * @param status
 * @param message
 * @param data
 */
const sendResponse = (res, result) => {
    res.logger.end(result.status);
    res.status(result.status).json({
        status: result.status,
        message: res.__(result.message),
        data: result.data
    });
};
exports.sendResponse = sendResponse;
