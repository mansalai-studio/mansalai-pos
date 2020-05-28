import { Request } from "express";
import { uuid } from "uuidv4";
import Slug from "../utils/Slug";

//repositories
import Category from "../models/CategoryModel";

class CategoryRepository {
  body: Request['body'];
  params: Request['params'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  all = async () => {
    const results = await Category.query();

    return results;
  }

  insert = async () => {
    const { name, description } = this.body

    const data = await Category.query().insert({
        id: uuid(),
        name,
        description,
        slug: Slug.generate(name) 
     });

     return data;
  }

  update = async () => {
    const { name, description } = this.body;
    const { id } = this.params;

    const data = await Category.query()
        .patchAndFetchById(id, {
            name, description, slug: Slug.generate(name)
        })

     return data;
  }
}

export default CategoryRepository;
