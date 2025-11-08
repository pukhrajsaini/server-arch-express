import * as Joi from 'joi';
export interface Environment {
  DB_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  ADMIN_NAME: string;
}

let env: Environment = {
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_NAME: process.env.ADMIN_NAME,
}

export async function setEnv() {
  const envVarsSchema = Joi.object({
    DB_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    ADMIN_EMAIL: Joi.string().email().required(),
    ADMIN_PASSWORD: Joi.string().required(),
    ADMIN_NAME: Joi.string().required(),
  });

  const validation = await envVarsSchema.validate(env, { abortEarly: false });
  if (validation.error) {
    const error = validation.error.details.map((e: any) => e = e.message);
    throw new Error(JSON.stringify(
      {
        message: "Env validation failed",
        data: { error }
      }
    ));
  }
  return true;
}


export default env;