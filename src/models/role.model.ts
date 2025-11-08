import { Document, model, Schema, Types } from "mongoose";
import { DB_MODELS } from "../constants";
export interface IRoleModel extends Document{
    _id: Types.ObjectId
    name: string;
    displayId: string;
    permissions: string[];
    description: string
    createdAt: Date
    updatedAt: Date
}


const roleSchema = new Schema({
    displayId: {
        type: String,
        required: true
    },
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



const RoleModel = model<IRoleModel>(DB_MODELS.ROLE, roleSchema);
export default RoleModel;