import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AppDataSource } from './database/services/typeorm-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3030', credentials: true });

  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  try {
    const { isInitialized } = await AppDataSource.initialize();
    // here you can start to work with your database
    console.log(`Data source connected: ${isInitialized}`);
  } catch (error) {
    console.log(`Data source connection error: ${error}`);
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NodeJs-Bulletin-Board-App service')
    .setDescription('This is service description')
    .setVersion('1.0.3')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(process.env.PORT || 9000);
}
bootstrap();
