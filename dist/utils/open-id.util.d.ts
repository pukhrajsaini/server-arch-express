export declare class OpenId {
    private static generateRandomString;
    static generate(length?: number, prefix?: string): string;
    static otp(length?: number): string;
    static password(length?: number): string;
}
