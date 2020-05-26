import bcrypt from "bcrypt";

class PasswordHash {
    public static hash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10)
    }

    public static compare = (password: string, userPassword: string): Promise<boolean> => {
        return bcrypt.compare(password, userPassword)
    }
}

export default PasswordHash;