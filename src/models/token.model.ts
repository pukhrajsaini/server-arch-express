import { Document, model, Schema, Types } from "mongoose";
import { DB_MODELS } from "../constants";

export interface ITokenModel extends Document {
    userId?: Types.ObjectId;
    adminId?: Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: string;
}


const tokenSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: false,
        ref: DB_MODELS.USER
    },
    adminId: {
        type: Types.ObjectId,
        required: false,
        ref: DB_MODELS.ADMIN
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: String,
        default: ''
    }
});

tokenSchema.index({ userId: 1 });

const TokenModel = model<ITokenModel>(DB_MODELS.TOKEN, tokenSchema);
export default TokenModel;