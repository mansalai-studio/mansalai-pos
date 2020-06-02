import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10)
    }

    public static passwordCompare = (password: string, userPassword: string): Promise<boolean> => {
        return bcrypt.compare(password, userPassword)
    }

    public static generateToken = (id: number): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || "secret";

        const token: string = jwt.sign({ id }, secretKey);

        return token;
    }
}

export default Authentication;