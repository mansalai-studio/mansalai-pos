import BaseRoutes from "./BaseRoutes";
import { auth } from "../middlewares/AuthMiddleware";
// Controllers
import UserController from "../controllers/UserController";

class UserRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get("/", auth, UserController.index);
        this.router.post("/", UserController.create);
        this.router.get("/:slug", UserController.show);
        this.router.put("/:slug", UserController.update);
        this.router.delete("/:slug", UserController.delete);
    }
}

export default new UserRoutes().router;