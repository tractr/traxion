import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LogService } from '@tractr/hapify-plugin-nestjs-core';

import { AppModule } from './app.module';

async function bootstrap() {
  // Instanciate nest app
  const app = await NestFactory.create(AppModule);

  // Set custom logger service
  const logger = app.get(LogService);
  app.useLogger(logger);

  // Set global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
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
  const API_PORT = process.env.TRACTR_API_PORT || 3000;
  await app.listen(API_PORT, () => {
    logger.log(`Api is listening on port ${API_PORT}`, 'NestApplication');
  });
}
bootstrap();
