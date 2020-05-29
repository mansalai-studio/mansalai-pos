import { Request } from "express";

//repositories
import CategoryRepository from "../repositories/CategoryRepositories";

class CategoryService {
  
  getAll = async (req: Request) => {
    const repository: CategoryRepository = new CategoryRepository(req);
    const results = await repository.all()
  
    return results;
  }

  store = async (req: Request) => {
    const repository: CategoryRepository = new CategoryRepository(req);
    const results = await repository.insert()

    return results;
  }

  update = async (req: Request) => {
    const repository: CategoryRepository = new CategoryRepository(req);
    const results = await repository.update()

    return results;
  }
}

export default CategoryService;
