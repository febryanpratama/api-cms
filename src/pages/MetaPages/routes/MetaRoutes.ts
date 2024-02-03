import BaseRoutes from "../../../core/routes/BaseRoutes";
import MetaController from "../controllers/MetaController";


class MetaRoutes extends BaseRoutes {
    public routes() : void {
        this.router.post('/store', MetaController.storeMeta);
    }
}

export default new MetaRoutes().router;
