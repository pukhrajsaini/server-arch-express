import AdminModel from "../../models/admin.model";
import { Auth } from "../../utils/auth.util";

class AuthService {

    async createAdmin() {
        try {
            const encryptedPassword = await new Auth().encryptPassword('Admin@1234');

            const isAdminExist = await AdminModel.exists({ email: 'my@admin.com' });
            if (isAdminExist) {
                console.log('Admin Exists');
            }
            else {
                await AdminModel.create({
                    email: 'admin@wefundus.com',
                    password: encryptedPassword,
                    name: 'We Fund Us Admin'
                });

                console.log('Admin created');
            }
            return;

        } catch (error) {
            console.log('error', error);
        }
    }

}
export default new AuthService();