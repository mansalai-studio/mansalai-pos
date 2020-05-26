import express, { Application, Request, Response } from "express";
import * as ExpressSession from "express-session";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { config as dotenv } from "dotenv";
import Knex from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';
import layouts from "express-ejs-layouts";

// Initialize knex.
const knex = Knex(knexConfig.development)

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
Model.knex(knex)

//session secret
const SESSION_SECRET = process.env.SESSION_SECRET;

//route
import UserRoutes from "./routers/User";
import AuthRoutes from "./routers/AuthRoutes";
import WebRoutes from "./routers/WebRoutes";

import { checkLogin } from "./middlewares/AuthMiddleware";

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
        this.app.use(express.static('public'));
        this.app.set('view engine', 'ejs');
        this.app.use(layouts);

        //sessionS
        this.app.use(
            require('express-session')({
                name: 'sid',
                resave: false,
                saveUninitialized: false,
                secret: SESSION_SECRET,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 2,
                    sameSite: true,
                    secure: false
                }
            })
        );
    }

    protected routes(): void {
        this.app.route("/").get(checkLogin);

        //web route
        this.app.use("/app", WebRoutes);

        //api route
        this.app.use("/api/v1/users", UserRoutes);
        this.app.use("/api/v1/auth", AuthRoutes);
    }
}

const port: number = 5001;
const app = new App().app;
app.listen(port, () => {
    console.log(`Applikasi in berjalan di port ${port}`)
});
