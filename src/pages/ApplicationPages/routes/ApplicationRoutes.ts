import BaseRoutes from "../../../core/routes/BaseRoutes";
import ApplicationController from "../controllers/ApplicationController";
// import AuthController from "../controller/AuthController";


class ApplicationRoutes extends BaseRoutes {
    public routes() : void {
        this.router.post('/store', ApplicationController.storeApp);
    }
}

export default new ApplicationRoutes().router;
