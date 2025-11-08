"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtil = void 0;
const jwt = require("jsonwebtoken");
const env_1 = require("../environment/env");
class JWTUtil {
    constructor() {
        this.secretKey = env_1.default.JWT_SECRET;
    }
    createJWT(payload, expiresIn = '48h') {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }
    decodeJwt(token) {
        const decoded = jwt.verify(token, this.secretKey);
        return decoded;
    }
}
exports.JWTUtil = JWTUtil;
const jwtUtil = new JWTUtil();
exports.default = jwtUtil;
