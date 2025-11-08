"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const tokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: false,
        ref: constants_1.DB_MODELS.USER
    },
    adminId: {
        type: mongoose_1.Types.ObjectId,
        required: false,
        ref: constants_1.DB_MODELS.ADMIN
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: String,
        default: ''
    }
});
tokenSchema.index({ userId: 1 });
const TokenModel = (0, mongoose_1.model)(constants_1.DB_MODELS.TOKEN, tokenSchema);
exports.default = TokenModel;
