import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { config as dotenv } from "dotenv";
import Knex from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';

// Initialize knex.
const knex = Knex(knexConfig.development)

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
Model.knex(knex)

//route
import UserRoutes from "./routers/User";
import AuthRoutes from "./routers/AuthRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
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
            res.send("hallo")
        });

        this.app.use("/api/v1/users", UserRoutes);
        this.app.use("/api/v1/auth", AuthRoutes);
    }
}

const port: number = 5001;
const app = new App().app;
app.listen(port, () => {
    console.log(`Applikasi in berjalan di port ${port}`)
});
