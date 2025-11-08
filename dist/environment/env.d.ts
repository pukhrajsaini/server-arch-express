export interface Environment {
    DB_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    MQTT_IP: string;
    MQTT_URL: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    ADMIN_NAME: string;
    MQTT_USERNAME: string;
    MQTT_PASSWORD: string;
}
declare let env: Environment;
export declare function setEnv(): Promise<boolean>;
export default env;
