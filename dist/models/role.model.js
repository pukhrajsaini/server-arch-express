"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false
    },
    permissions: {
        type: Array,
        required: false
    }
}, {
    timestamps: true
});
const RoleModel = (0, mongoose_1.model)(constants_1.DB_MODELS.ROLE, roleSchema);
exports.default = RoleModel;
