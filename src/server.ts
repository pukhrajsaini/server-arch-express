import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import * as express from 'express';
import * as cors from 'cors';
import db from './db';
import { resolve } from 'path';
import {I18n} from 'i18n';
import { logger } from './helpers/logger.helper';
import apiRoute from './apis/api.route';
import { LoggerUtil } from './utils';
import { setEnv } from './environment/env';


export class Server {
    private logger = new LoggerUtil('Server');
    public app: express.Application = express();

    constructor() {
        this.logger.log('Environment', process.env.NODE_ENV);
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

   async setConfigurations() {
        this.setEnv();
        this.setMongodb();
        this.enableCors();
        this.configBodyParser();
        this.setLanguage();
    }

    async setEnv(){
        await setEnv();
    }
    async setMongodb() {
        db.connectDb();
    }

  

    setLanguage() {
        const localePath = resolve(process.cwd() + '/assets/locales');
        const i18n = new I18n();
        i18n.configure({
          locales: ['en', 'fr'],
          directory: localePath
        })
        this.app.use(i18n.init);
      }

    enableCors() {
        this.app.use(
            cors({
                origin: true,
                credentials: true
            })
        );
    }

    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.json({ limit: '10mb' }));
    }

    setRoutes() {
        this.app.use('/apidoc', express.static(resolve(process.cwd() + '/assets/apidoc')))
        this.app.use('/logs', express.static(resolve(process.cwd() + '/logs/combined.log')))
        this.app.use(logger);
        this.app.use('/api', apiRoute);
      }

    error404Handler() {
        this.app.use((req: express.Request, res: express.Response) => {
            res.status(404).json({
                message: 'Route not found',
                status: 404
            });
        })
    }

    handleErrors() {
        this.app.use((error: any, req: any, res: any, next:any) => {
            this.logger.error('Error', error);
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        });
    }
}