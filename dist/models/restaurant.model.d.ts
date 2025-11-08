import { Types, Document, Schema } from "mongoose";
export interface IRestaurantModel extends Document {
    _id: Types.ObjectId | string;
    name: string;
    displayId: string;
    streetNumber: string;
    streetName: string;
    city: string;
    postalCode: string;
    description?: string;
    createdBy: Types.ObjectId | string | any;
    administratorId?: Types.ObjectId | string;
    administrator?: any;
    ownerId?: Types.ObjectId | string;
    owner?: any;
    isDeleted: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const RestaurantModel: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    displayId: string;
    postalCode: string;
    description?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    createdBy?: Types.ObjectId;
    administratorIds?: Types.ObjectId[];
    ownerId?: Types.ObjectId;
}, {}, {}, {}, Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    displayId: string;
    postalCode: string;
    description?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    createdBy?: Types.ObjectId;
    administratorIds?: Types.ObjectId[];
    ownerId?: Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    displayId: string;
    postalCode: string;
    description?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    createdBy?: Types.ObjectId;
    administratorIds?: Types.ObjectId[];
    ownerId?: Types.ObjectId;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    displayId: string;
    postalCode: string;
    description?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    createdBy?: Types.ObjectId;
    administratorIds?: Types.ObjectId[];
    ownerId?: Types.ObjectId;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    displayId: string;
    postalCode: string;
    description?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    createdBy?: Types.ObjectId;
    administratorIds?: Types.ObjectId[];
    ownerId?: Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    displayId: string;
    postalCode: string;
    description?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    createdBy?: Types.ObjectId;
    administratorIds?: Types.ObjectId[];
    ownerId?: Types.ObjectId;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
