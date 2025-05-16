import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Настройка статических файлов
  app.useStaticAssets(join(__dirname, '..', 'static')); // Указываем папку для статических файлов

  const config = new DocumentBuilder()
    .setTitle('Driving School App')
    .setDescription('Diploma project')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

export default start;