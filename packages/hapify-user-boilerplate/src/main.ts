import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LogService } from './core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Instanciate nest app
  const app = await NestFactory.create(AppModule);

  // Set custom logger service
  app.useLogger(app.get(LogService));

  // Set global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Set swagger documentation
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Hapify user boilerplate')
    .setDescription('This is the REST API documentation generated by Swagger')
    .setVersion('1.0')
    .addTag('swagger')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);

  // Start app and define port
  await app.listen(3000);
}
bootstrap();
