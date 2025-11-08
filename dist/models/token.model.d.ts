import { Document, Types } from "mongoose";
export interface ITokenModel extends Document {
    userId?: Types.ObjectId;
    adminId?: Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: string;
}
declare const TokenModel: import("mongoose").Model<ITokenModel, {}, {}, {}, Document<unknown, {}, ITokenModel> & ITokenModel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default TokenModel;
