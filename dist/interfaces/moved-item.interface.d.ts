import { Document, ObjectId } from 'mongoose';
import { ItemOwnerType } from './item.interface';
export interface MovedItemInterface extends Document {
    userId: ObjectId | string;
    itemId: ObjectId | string;
    surgeryDate: Date;
    surgonName: string;
    location: {
        _id: ObjectId | string;
        locationName: string;
        locationType: string;
        locationAddress: string;
        locationPhoneNumber: string;
        locationEmail: string;
        custom1: string;
        custom2: string;
    };
    item: MovedItems;
    createdAt: Date;
    updateAt: Date;
    movingStatus: MovedItemStatus;
}
export declare type MovedItems = {
    _id: ObjectId | string;
    itemName: string;
    itemOwner: ItemOwnerType;
    ownerName?: string;
    loanerName: string;
    consignmentName: string;
    itemId?: string;
    baseLocation: string;
    brand: string;
    type: string;
    custom1: string;
    custom2: string;
    images: string[];
    borrower: {
        _id: string | ObjectId;
        name: string;
        images: string[];
    };
    receivedImages: string[];
};
export declare enum MovedItemStatus {
    moving = 1,
    completed = 2
}
