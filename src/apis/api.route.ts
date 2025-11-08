import { Router } from "express";
import v1Route from "./v1/v1.route";


class ApiRoutes {
    public router: Router;
    constructor(){
        this.router = Router();
        this.router.use('/v1', v1Route);
    }
}


export default new ApiRoutes().router;