import { Request, Response } from "express";
import PasswordHash from "../utils/PasswordHash";

//models
import User from "../models/user";

class AuthController {
    register = async(req: Request, res: Response): Promise<Response> => {
        try {
            let { username, password } = req.body;
            const hashedPassword: string = await PasswordHash.hash(password);

            const createdUser = await User.query().insert({ username, password: hashedPassword });
           
            return res.send({message: "registration success"});
        } catch(err) {
            return res.send(err.message)
        }
        
    }

    login(req: Request, res: Response): Response {
        return res.send(req.body);
    }
    
}

export default new AuthController();