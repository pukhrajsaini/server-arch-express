import { Types } from "mongoose";
import { ServiceResponse } from "../../../interfaces";
import { IUpdateProfilePayload } from "./interfaces/update-profile";
declare class UserService {
    userProfile(id: Types.ObjectId | string, payload: IUpdateProfilePayload): Promise<ServiceResponse>;
    getUserProfile(id: Types.ObjectId | string): Promise<ServiceResponse>;
}
declare const _default: UserService;
export default _default;
