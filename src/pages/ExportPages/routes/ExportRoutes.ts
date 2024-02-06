import BaseRoutes from "../../../core/routes/BaseRoutes";
import ExportController from "../controllers/ExportController";


class ExportRoutes extends BaseRoutes {
    public routes() : void {
        this.router.get('/:id', ExportController.indexExport);
        this.router.get('/show/:id', ExportController.showExport);
    }
}

export default new ExportRoutes().router;
