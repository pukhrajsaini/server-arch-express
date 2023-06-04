import { Document, ObjectId } from "mongoose";
export interface LocationInterface extends Document {
    _id: ObjectId | string;
    locationName: string;
    locationType: string;
    locationAddress: string;
    locationPhoneNumber: string;
    locationEmail: string;
    custom1: string;
    custom2: string;
    geolocation: geolocation;
    createdAt?: Date;
    updated?: Date;
}
export interface geolocation {
    type: string | number;
    coordinates: number[];
}
