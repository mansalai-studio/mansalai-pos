import BaseRoutes from "./BaseRoutes";
import validate from "../middlewares/AuthValidator";

// Controllers
import CategoryController from "../controllers/CategoryController";

class AuthRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get("/", CategoryController.index);
        this.router.post("/create", CategoryController.create);
        this.router.put("/update/:id", CategoryController.update);
    }
}

export default new AuthRoutes().router;