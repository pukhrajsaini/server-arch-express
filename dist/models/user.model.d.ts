import { Types } from 'mongoose';
import { Document } from "mongoose";
export declare enum UserType {
    Administrator = "ADMINISTRATOR",
    Owner = "OWNER"
}
export interface IUserModel extends Document {
    _id: Types.ObjectId | string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    isActive: boolean;
    isDelete: boolean;
    otp: string;
    otpExpiresAt: Date;
    userType: UserType;
}
declare const UserModel: import("mongoose").Model<IUserModel, {}, {}, {}, Document<unknown, {}, IUserModel> & IUserModel & Required<{
    _id: string | Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default UserModel;
