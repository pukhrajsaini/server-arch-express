import { Types } from "mongoose";
import { IAdminModel } from "../../../models/admin.model";
import { ServiceResponse } from "../../../interfaces";
import { ICreateAdminPayload } from "./interfaces/create";
import { IListAdminQuery } from "./interfaces/list";
import { IChangePasswordPayload } from "./interfaces/change-password";
declare class AdminService {
    private logger;
    createAdmin(): Promise<boolean>;
    myProfile(id: Types.ObjectId | string): Promise<ServiceResponse>;
    create(payload: ICreateAdminPayload): Promise<ServiceResponse>;
    list(query: IListAdminQuery): Promise<ServiceResponse>;
    delete(id: string, admin: IAdminModel): Promise<ServiceResponse>;
    changePassword(payload: IChangePasswordPayload, adminId: Types.ObjectId): Promise<ServiceResponse>;
}
declare const _default: AdminService;
export default _default;
