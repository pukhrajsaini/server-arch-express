"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemCartSchema = new mongoose_1.Schema({
    itemId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'item',
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'user',
    },
    images: [{
            type: String
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const ItemCartModel = (0, mongoose_1.model)("itemcart", ItemCartSchema);
exports.default = ItemCartModel;
