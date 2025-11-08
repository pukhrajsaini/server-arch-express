import { HttpStatus } from "../../../constants";
import { ServiceResponse } from "../../../interfaces";
import { ISendOtpLoginPayload } from "./interfaces/sent-otp-login";
import { IVerifyOtpLoginPayload } from "./interfaces/verify-otp-login";
import { IAdminLoginPayload } from "./interfaces/admin-login";
declare class AuthService {
    private logger;
    login(payload: IAdminLoginPayload): Promise<{
        status: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        status: HttpStatus;
        message: string;
        data: {
            accessToken: string;
        };
    }>;
    senOtpLogin(payload: ISendOtpLoginPayload): Promise<ServiceResponse>;
    verifyOtpLogin(payload: IVerifyOtpLoginPayload): Promise<ServiceResponse>;
    private generateToken;
}
declare const _default: AuthService;
export default _default;
