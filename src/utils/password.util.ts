import { hash, compare } from 'bcrypt';

class PasswordUtil {

    async encrypt(password: string):Promise<string> {
        return await hash(password, 10);
    }

    async compare(password: string, hashPassword: string):Promise<boolean> {
        return await compare(password, hashPassword);
    }
}


export default new PasswordUtil();