import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });

  app.useStaticAssets((join(__dirname,'..','uploads')),{prefix: '/images'});


  const config = new DocumentBuilder()
    .setTitle('Game registration')
    .setDescription('registration api')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    allowedHeaders: ['Content-Type',"Authorization"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
  
  await app.listen(3000);
}
bootstrap();
