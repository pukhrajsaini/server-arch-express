"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        select: false
    },
    dob: {
        type: Date,
    },
    passwordToken: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    bio: {
        type: String,
    },
    accountType: [{
            type: String
        }],
    appleInfo: {
        social_id: String,
        social_token: String,
        default: {}
    },
    isEmailVerified: {
        type: Boolean,
    },
    isAccountActive: {
        type: Boolean,
    },
    accountStatus: {
        type: String,
        enum: ['VERIFIED', 'NOT_VERIFIED'],
        default: 'NOT_VERIFIED'
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
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
