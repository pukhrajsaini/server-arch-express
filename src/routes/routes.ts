import { Router } from "express";
import AuthRoutes from "./admin/auth.routes";
import AuthRouter from "./app/auth.router";
import TestRouter from "./app/test.router";


class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
  }

  app() {
    this.router.use('/app/auth', AuthRouter);
    this.router.use('/app/test', TestRouter);
  }

  admin() {
    this.router.use('/admin/auth', AuthRoutes);
  }

}
export default new Routes().router;