"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const deviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    displayId: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    hwVersion: {
        type: String,
        required: true
    },
    swVersion: {
        type: String,
        required: true
    },
    btLoaderVersion: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: constants_1.DB_MODELS.ADMIN,
        required: true
    },
    assignedBy: {
        type: mongoose_1.Types.ObjectId,
        ref: constants_1.DB_MODELS.ADMIN,
        required: false
    },
    unassignedBy: {
        type: mongoose_1.Types.ObjectId,
        ref: constants_1.DB_MODELS.ADMIN,
        required: false
    },
    restaurantId: {
        type: mongoose_1.Types.ObjectId,
        ref: constants_1.DB_MODELS.RESTAURANT,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
deviceSchema.index({ displayId: 1 }, { unique: true });
deviceSchema.index({ id: 1 }, { unique: true });
const DeviceModel = (0, mongoose_1.model)(constants_1.DB_MODELS.DEVICE, deviceSchema);
exports.default = DeviceModel;
