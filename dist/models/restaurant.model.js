"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const restaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    displayId: { type: String, required: true },
    streetNumber: { type: String, required: false },
    streetName: { type: String, required: false },
    city: { type: String, required: false },
    postalCode: { type: String, required: true },
    description: { type: String, required: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.DB_MODELS.ADMIN, required: false },
    administratorIds: { type: [mongoose_1.Schema.Types.ObjectId], ref: constants_1.DB_MODELS.USER, required: false },
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.DB_MODELS.USER, required: false },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
restaurantSchema.index({ displayId: 1 }, { unique: true });
exports.RestaurantModel = (0, mongoose_1.model)(constants_1.DB_MODELS.RESTAURANT, restaurantSchema);
