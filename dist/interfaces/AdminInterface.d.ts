import { ObjectId } from "mongoose";
export interface AdminInterface extends Document {
    _id: ObjectId;
    email: string;
    password: string;
    isEmailVerified: boolean;
    isAccountActive: boolean;
}
