import { Document, ObjectId } from "mongoose";
export interface UserInterface extends Document {
    _id: ObjectId | string;
    name?: string;
    email?: string;
    countryCode?: string;
    phoneNumber?: string;
    otp?: string;
    userType?: UserType;
    isApproved?: Approved;
    isCompleted?: boolean;
    isVerified?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updated?: Date;
}
export declare enum Approved {
    approved = 1,
    reject = 2,
    noAction = 3
}
export declare enum UserType {
    addedByAdmin = 1,
    selfRegister = 2
}
