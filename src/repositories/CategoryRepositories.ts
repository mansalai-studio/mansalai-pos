import { Request } from "express";
import { uuid } from "uuidv4";
import Slug from "../utils/Slug";

//repositories
import Category from "../models/CategoryModel";

interface paginateObject {
    next: {},
    previous: {},
    data: []
}

class CategoryRepository {
  body: Request['body'];
  params: Request['params'];
  query: Request['query'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  all = async () => {
    const { page, limit }: any  = this.query;

    const startIndex = (parseInt(page) - 1) *  parseInt(limit);
    const endIndex = parseInt(page) *  parseInt(limit);

    // let resultPaginate: paginateObject;
    var resultPaginate = <paginateObject>{};
    const countData = await Category.query().count().first();

    if (endIndex < countData.count) {
        resultPaginate.next = {
            page: parseInt(page) + 1,
            limit: parseInt(limit)
        }
        
    }
    
    if (startIndex > 0) {
        resultPaginate.previous = {
            page: parseInt(page) - 1,
            limit:  parseInt(limit)
        }
    }

    resultPaginate.data = await Category.query().page(startIndex, limit);
    console.log(resultPaginate.data)
    return resultPaginate;
    // try {
    //     // const resultsPaginate.results = await Category.query().page(startIndex, 10);
    //     // model.find().limit(limit).skip(startIndex).exec()
        
    //     return resultPaginate;
    // } catch (e) {
    //     return e.message
    // }
    // const results = await Category.query();

    // return results;
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
