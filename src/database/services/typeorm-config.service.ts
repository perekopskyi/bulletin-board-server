/**
 * This file used for generating and running migrations
 */

import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

const OPTIONS = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  logging: true,
  synchronize: false,
} as DataSourceOptions;

export const AppDataSource = new DataSource(OPTIONS);
