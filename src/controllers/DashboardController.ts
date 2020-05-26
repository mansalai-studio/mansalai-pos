import { Request, Response } from "express";

class DashboardController {
    index(req: Request, res: Response): void {
        res.render('dashboard/index');
    }
    
}

export default new DashboardController();