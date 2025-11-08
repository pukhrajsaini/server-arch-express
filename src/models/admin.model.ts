import { Document, model, Schema, Types } from "mongoose";
import { DB_MODELS } from "../constants";
export interface IAdminModel extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    displayId: string;
    isEMailVerified: boolean;
    password?: string;
    countryCode?: string;
    phoneNumber?: string;
    address?: string;
    roleId: Types.ObjectId;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt?: Date;
    deletedBy?: Types.ObjectId|string|any;
}


const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    displayId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: false
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    roleId: {
        type: Types.ObjectId,
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
    deletedAt: {
        type: Date
    },
    deletedBy: {
        type: Types.ObjectId,
        ref: DB_MODELS.ADMIN
    }
}, {
    timestamps: true
});

adminSchema.index({ email: 1 });
const AdminModel = model<IAdminModel>(DB_MODELS.ADMIN, adminSchema);
export default AdminModel;