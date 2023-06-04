import { Document, ObjectId } from "mongoose";
export interface ItemCartInterface extends Document {
    _id: ObjectId | string;
    itemId: ObjectId | string;
    userId: ObjectId | string;
    createdAt?: Date;
    updated?: Date;
}
