import { Router } from "express";
import { setApiMetadata } from "../../../middlewares/api-metadata.middleware";
import { ApiAccess } from "../../api.constant";
import { ApiActions, AppModules } from "../role/role.constant";
import adminController from "./admin.controller";
import authenticate from "../../../middlewares/auth.middleware";
import adminValidator from "./admin.validator";

class AdminRoutes {
    public router: Router;
    constructor() {
        this.router = Router();

        this.router.get(
            '/',
            setApiMetadata({
                access: ApiAccess.Admin,
                module: AppModules.Admin,
                action: ApiActions.Read
            }),
            authenticate.admin,
            adminController.list
        );

        this.router.get(
            '/profile',
            setApiMetadata({
                access: ApiAccess.Global,
                module: AppModules.Admin,
                action: ApiActions.Read
            }),
            authenticate.admin,
            adminController.myProfile
        );

        this.router.post(
            '',
            setApiMetadata({
                access: ApiAccess.Admin,
                module: AppModules.Admin,
                action: ApiActions.Create
            }),
            authenticate.admin,
            adminValidator.create,
            adminController.create
        );
        this.router.post(
            '/change-password',
            setApiMetadata({
                access: ApiAccess.Admin,
                module: AppModules.Admin,
                action: ApiActions.Update
            }),
            authenticate.admin,
            adminValidator.changePassword,
            adminController.changePassword
        );
        this.router.delete(
            '/:id',
            setApiMetadata({
                access: ApiAccess.Admin,
                module: AppModules.Admin,
                action: ApiActions.Delete
            }),
            authenticate.admin,
            adminController.delete
        )

    }

}


export default new AdminRoutes().router;