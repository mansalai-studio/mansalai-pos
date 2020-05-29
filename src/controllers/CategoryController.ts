import { Request, Response } from "express";
import IController from "./ControllerInterface";
//service
import CategoryService from "../services/CategoryService";

class CategoryController implements IController{
    index = async(req: Request, res: Response): Promise<Response> => {
        try {
            const service: CategoryService = new CategoryService();
            const categories = await service.getAll(req)
            
            return res.send(categories);
        } catch (error) {
            return res.send(error.message)
        }
        
    }
    create = async(req: Request, res: Response): Promise<Response> => {
        try {
            const service: CategoryService = new CategoryService();
            const category = await service.store(req)
            
            return res.send({ data: category, message: 'berhasil tambah kategori' });
        } catch (error) {
            return res.send(error.message)
        }
    }
    show(req: Request, res: Response): Response {
        throw new Error("Method no implemented");
    }
    update = async(req: Request, res: Response): Promise<Response> => {
        try {
            const service: CategoryService = new CategoryService();
            const category = await service.update(req)
            
            return res.send({ data: category, message: 'berhasil ubah kategori ' + category.name });
        } catch (error) {
            return res.send(error.message)
        }
    }
    delete(req: Request, res: Response): Response {
        throw new Error("Method no implemented");
    }
}

export default new CategoryController();