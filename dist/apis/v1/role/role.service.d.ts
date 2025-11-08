import { ServiceResponse } from "../../../interfaces";
declare class RoleService {
    private logger;
    createRole(): Promise<void>;
    getRoles(): Promise<ServiceResponse>;
}
declare const _default: RoleService;
export default _default;
