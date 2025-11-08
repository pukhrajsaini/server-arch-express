declare class PasswordUtil {
    encrypt(password: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
}
declare const _default: PasswordUtil;
export default _default;
