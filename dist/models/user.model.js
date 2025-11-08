"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
var UserType;
(function (UserType) {
    UserType["Administrator"] = "ADMINISTRATOR";
    UserType["Owner"] = "OWNER";
})(UserType || (exports.UserType = UserType = {}));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    name: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true
    },
    phoneNumber: {
        type: String,
    },
    countryCode: {
        type: String
    },
    userType: {
        type: String,
        enum: Object.values(UserType),
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
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date
    }
}, { timestamps: true });
userSchema.index({ email: 1 });
userSchema.index({ countryCode: 1, phoneNumber: 1 }, { unique: true });
const UserModel = (0, mongoose_1.model)(constants_1.DB_MODELS.USER, userSchema);
exports.default = UserModel;
