"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger_1 = require("../utils/logger");
const logger = (req, res, next) => {
    const logger = new logger_1.default(req);
    res.logger = logger;
    next();
};
exports.logger = logger;
