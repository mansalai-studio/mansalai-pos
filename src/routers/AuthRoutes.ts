import BaseRoutes from "./BaseRoutes";

// Controllers
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post("/register", AuthController.index);
        this.router.post("/login", AuthController.create);
    }
}

export default new AuthRoutes().router;