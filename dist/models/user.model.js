"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_interface_1 = require("../interfaces/user.interface");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String,
    },
    otp: {
        type: String
    },
    userType: {
        type: Number,
        enum: [user_interface_1.UserType.addedByAdmin, user_interface_1.UserType.selfRegister]
    },
    isApproved: {
        type: Number,
        enum: [user_interface_1.Approved.approved, user_interface_1.Approved.reject, user_interface_1.Approved.noAction],
        default: user_interface_1.Approved.noAction,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    timestamps: {
        type: String,
        default: Math.round(new Date().getTime()),
    },
});
const UserModel = (0, mongoose_1.model)("user", UserSchema);
exports.default = UserModel;
