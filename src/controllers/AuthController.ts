import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
import bcrypt from "bcrypt";
//models
import User from "../models/user";

//service
import UserService from "../services/UserService";

class AuthController {
    register = async(req: Request, res: Response): Promise<Response> => {
        try {
            let { username, password } = req.body;
            const hashedPassword: string = await Authentication.passwordHash(password);

            const createdUser = await User.query().insert({ username, password: hashedPassword });
           
            return res.send({message: "registration success"});
        } catch(err) {
            return res.send(err.message);
        }
        
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: UserService = new UserService();
            const user = await service.findByUsername(req)
            
            return res.send(user);
        } catch (error) {
            return res.send(error.message)
        }
    }

    logout = (req: Request, res: Response): void => {
        //
    }

    process_login = async(req: Request, res: Response): Promise<void> => {

        //
        
    }
    
}

export default new AuthController();