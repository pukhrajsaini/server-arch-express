export declare class JWTUtil {
    private secretKey;
    constructor();
    createJWT(payload: any, expiresIn?: string | number): string;
    decodeJwt(token: string): any;
}
declare const jwtUtil: JWTUtil;
export default jwtUtil;
