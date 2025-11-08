import { ServiceResponse } from "../../../interfaces";
import { HttpStatus } from "../../../constants";
import { ROLES } from "./role.constant";
import RoleModel from "../../../models/role.model";
import { LoggerUtil, OpenId } from "../../../utils";
import adminService from "../admin/admin.service";

class RoleService {

    private logger = new LoggerUtil('RoleService');

    async createRole() {
        for (const role of ROLES) {

            const isExists = await RoleModel.findOne({ name: role.name });
            if (isExists) {
                await RoleModel.findByIdAndUpdate(isExists._id, {
                    name: role.name,
                    permissions: role.permissions
                });

                this.logger.log("Role updated");
            } else {
                const displayId = OpenId.generate(6,'ROLE');
                await RoleModel.create({
                    displayId,
                    name: role.name,
                    permissions: role.permissions
                });
                this.logger.log("Role created");
            }
        }
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