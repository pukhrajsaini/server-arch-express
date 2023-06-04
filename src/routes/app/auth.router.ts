import { Router } from "express";

class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
    }

    
}

export default new AuthRouter().router;