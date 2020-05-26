import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): any  => {
    console.log('ini adalah middleware');
    next();
}

export const isLogin = (req: Request, res: Response, next: NextFunction): any => {
    if (req.session) {
        if(req.session.userId) {
            return true;
        }else{
            return false;
        }
    }
}

export const checkLogin = (req: Request, res: Response, next: NextFunction): any  => {
    if(!isLogin(req, res, next)){
        res.redirect('/app/users/login');
    } else {
        next();
    }
}

export const afterLogin = (req: Request, res: Response, next: NextFunction): any  => {
    if (req.session) {
        if(req.session.userId) {
            res.redirect('/app/dashboard');
        } else {
            next();
        }
    }
}