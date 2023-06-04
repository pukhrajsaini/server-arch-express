export declare class Email {
    private email;
    constructor(email: string);
    sendVerificationEmail(verificationUrl: string): Promise<void>;
    sendForgetPasswordEmail(resetUrl: string): Promise<void>;
}
