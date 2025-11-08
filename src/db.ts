import mongoose from 'mongoose';
import env from './environment/env';
import { LoggerUtil } from './utils';
import roleService from './apis/v1/role/role.service';


class Db {
    private logger = new LoggerUtil('DB')
    async connectDb(): Promise<boolean> {
        try {
            
            await mongoose.connect(env.DB_URL);
            this.logger.log('Database connected');
            await roleService.createRole();
            return true;
        } catch (error) {
            this.logger.error(error, 'Error to connecting database');
            return false;
        }
    }
}

export default new Db();
