import { Document, model, Schema, Types } from "mongoose";
import { DB_MODELS } from "../constants";
import { ApiActions, AppModules } from "../apis/v1/role/role.constant";

export interface IPermissions {
    entity: AppModules,
    actions: ApiActions[]
}

export interface IRoleModel extends Document{
    _id: Types.ObjectId
    name: string;
    displayId: string;
    permissions: IPermissions[];
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
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
        type: [
            {
                entity: {
                    type: String,
                    required: true
                },
                actions: {
                    type: [String],
                    required: true
                }
            }
        ],
        required: false,
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});



const RoleModel = model<IRoleModel>(DB_MODELS.ROLE, roleSchema);
export default RoleModel;