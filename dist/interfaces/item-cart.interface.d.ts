import { Document, ObjectId } from "mongoose";
export interface ItemCartInterface extends Document {
    _id: ObjectId | string;
    itemId: ObjectId | string;
    userId: ObjectId | string;
    createdAt?: Date;
    updated?: Date;
}
/**
 * @type for ItemCart request body
 */
export declare type ItemCartImageType = {
    /**
     * key as item's _id an images as value
     */
    [itemId: string]: any[];
};
