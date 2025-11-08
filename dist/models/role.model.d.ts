import { Document, Types } from "mongoose";
export interface IRoleModel extends Document {
    _id: Types.ObjectId;
    name: string;
    permissions: string[];
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const RoleModel: import("mongoose").Model<IRoleModel, {}, {}, {}, Document<unknown, {}, IRoleModel> & IRoleModel & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default RoleModel;
