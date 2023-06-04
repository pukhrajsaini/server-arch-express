"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const item_interface_1 = require("../interfaces/item.interface");
const ItemSchema = new mongoose_1.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemOwner: {
        type: Number,
        enum: [item_interface_1.ItemOwnerType.owner, item_interface_1.ItemOwnerType.loaner, item_interface_1.ItemOwnerType.consignment],
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
        required: true,
    },
    baseLocation: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    custom1: {
        type: String
    },
    custom2: {
        type: String
    },
    images: [{
            type: String
        }],
    isApproved: {
        type: Number,
        enum: [item_interface_1.Approved.approved, item_interface_1.Approved.reject, item_interface_1.Approved.noAction],
        default: item_interface_1.Approved.approved,
    },
    borrowerId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'user',
    },
    movingStatus: {
        type: Number,
        enum: [item_interface_1.MovingItem.assigned, item_interface_1.MovingItem.moving, item_interface_1.MovingItem.moved, item_interface_1.MovingItem.returned, item_interface_1.MovingItem.addedToMove],
        default: item_interface_1.MovingItem.assigned,
    },
    pdf: {
        type: String
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
const ItemModel = (0, mongoose_1.model)("item", ItemSchema);
exports.default = ItemModel;
