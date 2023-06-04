import { Document, ObjectId } from "mongoose";
export interface UserInterface extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    dob: Date;
    profilePic: string;
    accountType: string;
    appleInfo: string;
    isEmailVerified: boolean;
    isAccountActive: boolean;
    passwordToken: string;
}
