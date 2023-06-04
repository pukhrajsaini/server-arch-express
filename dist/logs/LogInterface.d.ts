import { ObjectId, Document } from 'mongoose';
export interface LogInterface extends Document {
    _id: ObjectId;
    execStatus: 1 | 2 | 3;
    status: number;
    message: string;
    execTime: number;
    data: any;
}
