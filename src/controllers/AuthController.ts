import { Request, Response } from "express";
import PasswordHash from "../utils/PasswordHash";
import bcrypt from "bcrypt";
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
            return res.send(err.message);
        }
        
    }

    login = (req: Request, res: Response): void => {
        res.render('users/login', { layout: 'layouts/login' });
    }

    logout = (req: Request, res: Response): void => {
        if(req.session)
            req.session.destroy((err) => {
                if (err) {
                    res.redirect('/app/dashboard');
                }
                res.clearCookie('sid');
                res.redirect('/app/users/login');
            });        
    }

    process_login = async(req: Request, res: Response): Promise<void> => {

        try {
            let { username, password } = req.body;
             
            const user = await User.query().where('username', username).first();
           
            
            if (user) {
                const match: boolean = await PasswordHash.compare(password, user.password);
                const test = await bcrypt.compare(password, user.password);

                console.log(test);
                if(match) {
                    console.log('Login success');
                    if (req.session) {
                        req.session.userId = user;
                    }
                    res.redirect('/app/dashboard');                
                } else {
                    console.log('Login failed');
                    res.redirect('/app/users/login');
                }
            } else {
                res.send({message: 'username or password not found'});
            }
            
        } catch (err) {
            res.send(err.message);
        }
        
    }
    
}

export default new AuthController();