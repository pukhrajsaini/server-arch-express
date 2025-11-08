import { Document, Types } from "mongoose";
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
    deletedBy?: Types.ObjectId | string | any;
}
declare const AdminModel: import("mongoose").Model<IAdminModel, {}, {}, {}, Document<unknown, {}, IAdminModel> & IAdminModel & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default AdminModel;
