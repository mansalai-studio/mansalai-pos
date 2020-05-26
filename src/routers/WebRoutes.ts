import BaseRoutes from "./BaseRoutes";
import validate from "../middlewares/AuthValidator";
import { checkLogin, afterLogin } from "../middlewares/AuthMiddleware";

// Controllers
import DashboardController from "../controllers/DashboardController";
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get("/dashboard", checkLogin, DashboardController.index);

        //user
        this.router.get("/users/login", afterLogin, AuthController.login);
        this.router.post("/users/login", afterLogin, AuthController.process_login);
        this.router.get("/users/logout", checkLogin, AuthController.logout);
    }
}

export default new AuthRoutes().router;