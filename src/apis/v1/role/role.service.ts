import { ServiceResponse } from "../../../interfaces";
import { HttpStatus } from "../../../constants";
import { ROLES } from "./role.constant";
import RoleModel from "../../../models/role.model";
import { LoggerUtil } from "../../../utils";
import adminService from "../admin/admin.service";

class RoleService {

    private logger = new LoggerUtil('RoleService');

    async createRole() {
        for (const role of ROLES) {
            await RoleModel.findOneAndUpdate({
                name: role.name
            },

                {
                    name: role.name,
                    permissions: role.permissions
                },
                {
                    upsert: true
                }
            );
        }
        this.logger.log("Roles created");
        await adminService.createAdmin();
    }


    async getRoles(): Promise<ServiceResponse> {
        return {
            status: HttpStatus.Ok,
            message: 'roles_fetched',
            data: {
                roles: ROLES
            }
        }
    }
}

export default new RoleService();