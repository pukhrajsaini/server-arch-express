import { ServiceResponse } from "../../../interfaces";
import { IAdminModel } from "../../../models/admin.model";
import { IAssignDevicePayload } from "./interfaces/assign";
import { ICreateDevicePayload } from "./interfaces/create";
import { IDeviceListQueryPayload } from "./interfaces/list";
declare class DeviceService {
    private logger;
    create(payload: ICreateDevicePayload, admin: IAdminModel): Promise<ServiceResponse>;
    list(query: IDeviceListQueryPayload): Promise<ServiceResponse>;
    details(id: string): Promise<ServiceResponse>;
    assign(payload: IAssignDevicePayload, admin: IAdminModel): Promise<ServiceResponse>;
    delete(id: string): Promise<ServiceResponse>;
    restaurantDevices(restaurantId: string): Promise<ServiceResponse>;
    getDeviceById(id: string): Promise<ServiceResponse>;
    private generatePowerHistory;
    private calculateAveragePower;
}
declare const _default: DeviceService;
export default _default;
