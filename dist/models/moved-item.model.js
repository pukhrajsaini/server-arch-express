"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moved_item_interface_1 = require("../interfaces/moved-item.interface");
const MovedItemSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    itemId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'item'
    },
    surgeryDate: {
        type: Date,
        required: true
    },
    surgonName: {
        type: String,
        required: true
    },
    location: {
        _id: {
            type: mongoose_1.Types.ObjectId,
            required: true
        },
        locationName: {
            type: String,
            required: true
        },
        locationType: {
            type: String,
            required: true
        },
        locationAddress: {
            type: String,
            required: true
        },
        locationPhoneNumber: {
            type: String,
            required: true
        },
        locationEmail: {
            type: String,
            required: true
        },
        custom1: {
            type: String,
            required: true
        },
        custom2: {
            type: String,
            required: true
        },
    },
    item: {
        _id: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true
        },
        itemName: {
            type: String,
        },
        itemOwner: {
            type: String,
        },
        ownerName: {
            type: String,
        },
        loanerName: {
            type: String,
        },
        consignmentName: {
            type: String,
        },
        itemId: {
            type: String,
        },
        baseLocation: {
            type: String,
        },
        brand: {
            type: String,
        },
        type: {
            type: String,
        },
        custom1: {
            type: String,
        },
        custom2: {
            type: String,
        },
        images: {
            type: [String],
            default: []
        },
        borrower: {
            _id: {
                type: mongoose_1.Types.ObjectId
            },
            name: {
                type: String
            },
            images: {
                type: [String],
                default: []
            }
        },
        receivedImages: {
            type: [String],
            default: []
        }
    },
    movingStatus: {
        type: Number,
        default: moved_item_interface_1.MovedItemStatus.moving
    }
});
const MovedItemModel = (0, mongoose_1.model)('movedItem', MovedItemSchema);
exports.default = MovedItemModel;
