import { Router } from "express";
import testController from "../../controllers/app/test.controller";

class TestRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
    }

    getRoutes() {
        this.router.get(
            '/',
            testController.test
        );
    }


}

export default new TestRouter().router;