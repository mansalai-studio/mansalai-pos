import { Request, Response } from "express";

class AuthController {
    index(req: Request, res: Response): Response {
        return res.send("ini adalah endpoint index");
    }
    create(req: Request, res: Response): Response {
        return res.send(req.body);
    }
    
}

export default new AuthController();