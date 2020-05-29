import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): any  => {
    console.log('ini adalah middleware');
    next();
}

export const isLogin = (req: Request, res: Response, next: NextFunction): any => {
    //
}

export const checkLogin = (req: Request, res: Response, next: NextFunction): any  => {
    //
}

export const afterLogin = (req: Request, res: Response, next: NextFunction): any  => {
    //
}