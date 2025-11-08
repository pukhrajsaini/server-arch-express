
import { Types } from "mongoose";
import { HttpStatus } from "../../../constants";
import TokenModel from "../../../models/token.model";
import jwtUtil from "../../../utils/jwt.util";
import { IAdminLoginPayload } from "./interfaces/admin-login";
import AdminModel from "../../../models/admin.model";
import passwordUtil from "../../../utils/password.util";

class AuthService {


    async login(
        payload: IAdminLoginPayload
    ) {

        const { email, password } = payload;
        const admin = await AdminModel.findOne({ email });

        if (!admin) return { status: HttpStatus.BadRequest, message: 'invalid_credentials' };
        const isMatch = await passwordUtil.compare(password, admin.password);
        if (!isMatch) return { status: HttpStatus.BadRequest, message: 'invalid_credentials' };
        const accessToken = await this.generateToken({adminId: admin._id});
        return {
            status: HttpStatus.Ok,
            message: 'login_success',
            data: {
                accessToken
            }
        };
    }

 

    private async generateToken(data: { userId?: any, adminId?: Types.ObjectId }): Promise<string> {
        if (data.userId) {
            const token = await TokenModel.create({ userId: data.userId });
            const payload = { tid: `${token._id}` };
            return jwtUtil.createJWT(payload, '7d');
            
        }else if (data.adminId) {
        const token = await TokenModel.create({ adminId: data.adminId });
        const payload = { tid: `${token._id}` };
        return jwtUtil.createJWT(payload, '7d');
        }
    }
}




export default new AuthService()