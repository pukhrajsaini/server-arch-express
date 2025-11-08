"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const adminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    displayId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: false
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    roleId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },
    deletedBy: {
        type: mongoose_1.Types.ObjectId,
        ref: constants_1.DB_MODELS.ADMIN
    }
}, {
    timestamps: true
});
adminSchema.index({ email: 1 });
const AdminModel = (0, mongoose_1.model)(constants_1.DB_MODELS.ADMIN, adminSchema);
exports.default = AdminModel;
