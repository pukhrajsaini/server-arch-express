import { Router } from "express";
import authValidator from "./auth.validator";
import authController from "./auth.controller";

class AuthRoutes {
    public router: Router;
    constructor() {
        this.router = Router();

        this.router.post(
            '/login',
            authValidator.login,
            authController.adminLogin
        );

    }

}


export default new AuthRoutes().router;