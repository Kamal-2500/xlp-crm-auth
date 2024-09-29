import dotenv from "dotenv";
import { NonNullableProps } from "../utils";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

type Env = {
    SERVER_HOST: string | undefined;
    SERVER_PORT: string | undefined;
    DB_HOST: string | undefined;
    DB_USER: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_NAME: string | undefined;
    JWT_SECRET_KEY:  string | undefined;
    JWT_EXPIRES_IN: string | undefined;
}

type SenitizedEnv = NonNullableProps<Env>;

type Configs = {
    server: {
        host: SenitizedEnv['SERVER_HOST'];
        port: SenitizedEnv['SERVER_PORT'];
    };
    db: {
        host: SenitizedEnv['DB_HOST'];
        user: SenitizedEnv['DB_USER'];
        password: SenitizedEnv['DB_PASSWORD'];
        name: SenitizedEnv['DB_NAME'];
    },
    jwt: {
        secretKey: SenitizedEnv['JWT_SECRET_KEY'];
        expiresIn: number;
    }
}

const genEnv = (): Env => {
    return {
        SERVER_HOST: process.env.SERVER_HOST,
        SERVER_PORT: process.env.SERVER_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    }
}

const getSenitizedEnv = (env: Env): SenitizedEnv => {
    for (const [key, value] of Object.entries(env)) {
        if (!value) {
            throw new Error(`Value of ${key} is empty or null`);
        }
    }
    return env as SenitizedEnv;
}

const senitizedEnv = getSenitizedEnv(genEnv());

export const configs: Configs = {
    server: {
        host: senitizedEnv.SERVER_HOST,
        port: senitizedEnv.SERVER_PORT
    },
    db: {
        host: senitizedEnv.DB_HOST,
        user: senitizedEnv.DB_USER,
        password: senitizedEnv.DB_PASSWORD,
        name: senitizedEnv.DB_NAME
    },
    jwt: {
        secretKey: senitizedEnv.JWT_SECRET_KEY,
        expiresIn: Number(senitizedEnv.JWT_EXPIRES_IN)
    }
}