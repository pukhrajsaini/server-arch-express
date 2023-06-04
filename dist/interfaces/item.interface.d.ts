import { Document, ObjectId } from "mongoose";
export interface ItemInterface extends Document {
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
    isApproved?: Approved;
    borrowerId?: ObjectId | string;
    movingStatus: MovingItem;
    pdf: string;
    createdAt?: Date;
    updated?: Date;
}
export declare enum Approved {
    approved = 1,
    reject = 2,
    noAction = 3
}
export declare enum ItemOwnerType {
    owner = 1,
    loaner = 2,
    consignment = 3
}
export declare enum MovingItem {
    assigned = 1,
    moving = 2,
    moved = 3,
    returned = 4,
    addedToMove = 5
}
