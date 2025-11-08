import { Document, Types } from "mongoose";
export interface IDeviceModel extends Document {
    _id: Types.ObjectId | string;
    name: string;
    displayId: string;
    id: string;
    serialNumber: string;
    hwVersion: string;
    swVersion: string;
    btLoaderVersion: string;
    notes?: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: Types.ObjectId | string | any;
    assignedBy: Types.ObjectId | string | any;
    unassignedBy: Types.ObjectId | string | any;
    restaurantId: Types.ObjectId | string | any;
    createdAt: Date;
    updatedAt: Date;
}
declare const DeviceModel: import("mongoose").Model<IDeviceModel, {}, {}, {}, Document<unknown, {}, IDeviceModel> & IDeviceModel & Required<{
    _id: string | Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default DeviceModel;
