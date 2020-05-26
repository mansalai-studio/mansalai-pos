import { Request, Response, NextFunction } from "express";
import { check, validationResult} from "express-validator";

//model user
import User from "../models/user";

const validate = [
    check('username').isString(),
    check('password').isLength({ min: 6 }),
    check('username').custom(async value => {
        let usernameCheck = await User.query().where('username', value)
        
        if(usernameCheck) {
            return Promise.reject();
        }
    }).withMessage('Username is already in use.'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }

        

        next();
    }
];

export default validate;