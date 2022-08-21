import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppDataSource } from './database/services/typeorm-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
      console.log('!! init db');
    })
    .catch((error) => console.log(error));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NodeJs-Bulletin-Board-App service')
    .setDescription('This is service description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 9000);
}
bootstrap();
