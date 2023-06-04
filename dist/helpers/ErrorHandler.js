"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const ResponseConstant_1 = require("../constants/ResponseConstant");
const app_error_1 = require("../utils/app-error");
class ErrorHandler {
    constructor() {
    }
    globalErrorHandler(err, req, res, next) {
        err.statusCode = err.statusCode || ResponseConstant_1.RESPONSE.HTTP_INTERNAL_SERVER_ERROR;
        err.status = err.status || err.status;
        if (process.env.NODE_ENV === 'test') {
        }
        else {
            //log the error
            console.log('Error', err);
            let error = Object.assign({}, err);
            console.log('error', error);
            if (error.name === 'JsonWebTokenError')
                error = this.handleJwtError(res);
            if (error.name === 'TokenExpiredError')
                error = this.handleExpiredTokenError(res);
            if (error.kind === 'ObjectId')
                error = this.handleCastError(error, res);
            if (!error.message) {
                error.message = err.message;
            }
        }
    }
    handleJwtError(res) {
        const message = res.__('jwt_invalid_token');
        return new app_error_1.AppError(message, ResponseConstant_1.RESPONSE.HTTP_UNAUTHORIZED, 'JWT_INVALID');
    }
    handleExpiredTokenError(res) {
        const message = res.__('jwt_expired_token');
        return new app_error_1.AppError(message, ResponseConstant_1.RESPONSE.HTTP_UNAUTHORIZED, 'JWT_EXPIRED');
    }
    handleCastError(err, res) {
        const idValue = err.value;
        let message = res.__('invalid_oject_id');
        message = message.replace('$_id', idValue);
        return new app_error_1.AppError(message, ResponseConstant_1.RESPONSE.HTTP_BAD_REQUEST, 'BAD_REQUEST');
    }
    sendErrTest(err, res) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
    sendError(err, req, res) {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                statusText: err.statusText
            });
            // programming or other unknown errors : don't want to leak error details
        }
        else {
            // 1) log the errors
            // console.error('Error : ', err);
            // 2) send a generic message
            res.status(ResponseConstant_1.RESPONSE.HTTP_INTERNAL_SERVER_ERROR).json({
                status: 500,
                statusText: 'ERROR',
                message: 'Something Went Wrong',
            });
        }
    }
}
exports.ErrorHandler = ErrorHandler;
exports.default = new ErrorHandler();
