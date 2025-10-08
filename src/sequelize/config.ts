import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

interface ISequelizeConfig {
  [key: string]: {
    dialect: Dialect;
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
}

const config: ISequelizeConfig = {
  development: {
    dialect: 'postgres',
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'q1w2e3r4',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DB || 'postgres',
  },
  test: {
    dialect: 'postgres',
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'q1w2e3r4',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DB || 'postgres',
  },
  production: {
    dialect: 'postgres',
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'q1w2e3r4',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DB || 'postgres',
  },
};

export = config;
