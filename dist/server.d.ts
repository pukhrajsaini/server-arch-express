import * as express from 'express';
export declare class Server {
    private logger;
    app: express.Application;
    constructor();
    setConfigurations(): Promise<void>;
    setEnv(): Promise<void>;
    setMongodb(): Promise<void>;
    setMqtt(): Promise<void>;
    setLanguage(): void;
    enableCors(): void;
    configBodyParser(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleErrors(): void;
}
