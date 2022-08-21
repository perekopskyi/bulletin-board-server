import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,

      entities: [process.env.TYPEORM_ENTITIES],
      logging: true,
      synchronize: false,
      migrations: [process.env.TYPEORM_MIGRATIONS],
      // cli: {
      //   migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      // },
      // namingStrategy: new SnakeNamingStrategy(),
    };
  }
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: [process.env.TYPEORM_ENTITIES],
  logging: true,
  synchronize: false,
  migrations: [process.env.TYPEORM_MIGRATIONS],
  // cli: {
  //   migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  // },
  // namingStrategy: new SnakeNamingStrategy(),
});
