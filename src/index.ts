import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

//route
import UserRoutes from "./routers/User";


class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({
            limit: "8mb",
        }));
        this.app.use(morgan("dev"));
        this.app.use(compression())
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("ini route type script")
        });

        this.app.use("/api/v1/users", UserRoutes)

    }
}

const port: number = 5001;
const app = new App().app;
app.listen(port, () => {
    console.log(`Applikasi in berjalan di port ${port}`)
});
