import BaseRoutes from "../../../core/routes/BaseRoutes";
import GenerateController from "../controllers/GenerateController";
// import AuthController from "../controller/AuthController";


class GenerateRoutes extends BaseRoutes {
    public routes() : void {
        this.router.post('/text', GenerateController.generateAiText);
        this.router.post('/image', GenerateController.generateAiImage);
        this.router.get('/artikel/:id', GenerateController.generateArtikel);
    }
}

export default new GenerateRoutes().router;
