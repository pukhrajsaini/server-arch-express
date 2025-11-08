import { Router } from "express";
import authRoute from "./auth/auth.route";
import adminRoute from "./admin/admin.route";


class V1Routes {
    public router: Router;
    constructor(){
        this.router = Router();
        this.routes()
    }


    routes(){
        this.router.use('/auth', authRoute);
        this.router.use('/admins', adminRoute);
    }
}


export default new V1Routes().router;