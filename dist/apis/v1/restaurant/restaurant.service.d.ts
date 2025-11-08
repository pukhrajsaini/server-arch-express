import { IAdminModel } from "../../../models/admin.model";
import { ICreateRestaurantPayload } from "./interfaces/create";
import { ServiceResponse } from "../../../interfaces";
import { IListRestaurantQuery } from "./interfaces/list";
declare class RestaurantService {
    create(payload: ICreateRestaurantPayload, admin: IAdminModel): Promise<ServiceResponse>;
    list(query: IListRestaurantQuery): Promise<ServiceResponse>;
    details(id: string): Promise<ServiceResponse>;
    delete(id: string): Promise<ServiceResponse>;
    resturantListByUser(id: string): Promise<ServiceResponse>;
}
declare const _default: RestaurantService;
export default _default;
