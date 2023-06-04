import { Router } from "express";

class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();

    }

}

export default new AuthRoutes().router;