import { Request } from "express";

import Authentication from "../utils/Authentication";

//repositories
import UserRepository from "../repositories/UserRepositories";

class UserService {
  
  getAll = async (req: Request) => {
    const repository: UserRepository = new UserRepository(req);
    const results = await repository.all()
  
    return results;
  }

  store = async (req: Request) => {
    const repository: UserRepository = new UserRepository(req);
    const results = await repository.insert()

    return results;
  }

  update = async (req: Request) => {
    const repository: UserRepository = new UserRepository(req);
    const results = await repository.update()

    return results;
  }

  findByUsername = async (req: Request) => {
      const repository: UserRepository = new UserRepository(req);
      const user = await repository.findByUsername();

      if (user) {
        const checkPassword = await Authentication.passwordCompare(req.body.password, user.password);

        if(checkPassword) {
            let token = Authentication.generateToken(user.id)

            return {"token": token}
        }

        return {
            'error': true, 
            'message': 'wrong username or password'
        }
      }

      
  }
}

export default UserService;
