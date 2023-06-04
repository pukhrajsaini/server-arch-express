"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoutes = void 0;
const erxpress = require("express");
const LogController_1 = require("./LogController");
exports.logRoutes = erxpress.Router();
exports.logRoutes.get('/list', LogController_1.getList);
