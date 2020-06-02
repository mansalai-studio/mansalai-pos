import { Request } from "express";
import { uuid } from "uuidv4";
import Slug from "../utils/Slug";

//model
import User from "../models/user";

interface paginateObject {
    next: {},
    previous: {},
    data: []
}

class UserRepository {
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
        const countData = await User.query().count().first();

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

        resultPaginate.data = await User.query().page(startIndex, limit);
        
        return resultPaginate;
        
    }

    insert = async () => {
        const { name, description } = this.body

        const data = await User.query().insert({
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

        const data = await User.query()
            .patchAndFetchById(id, {
                name, description, slug: Slug.generate(name)
            })

        return data;
    }

    findByUsername = async () => {
        const { username } = this.body;

        const data = await User.query()
            .where('username', '=', username)
            .first()

        return data;
    }
}

export default UserRepository;
