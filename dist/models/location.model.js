"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LocationSchema = new mongoose_1.Schema({
    locationName: {
        type: String,
        required: true,
    },
    locationType: {
        type: String,
    },
    locationAddress: {
        type: String,
    },
    locationPhoneNumber: {
        type: String,
    },
    locationEmail: {
        type: String,
    },
    custom1: {
        type: String,
    },
    custom2: {
        type: String,
    },
    geolocation: {
        type: {
            type: String, enum: ['Point'],
            index: { type: '2dsphere', sparse: false }
        },
        coordinates: [{
                type: [Number],
                default: undefined
            }
        ],
    },
});
const LocationModel = (0, mongoose_1.model)("location", LocationSchema);
exports.default = LocationModel;
