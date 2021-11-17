/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@tractr/nestjs-core';
import morgan from 'morgan';

import { AppModule } from './app/app.module';

// Bootstrap the main application
async function bootstrap() {
  const port = process.env.PORT || 3000;
  const globalPrefix = 'api';

  // Instantiate nest app
  const app = await NestFactory.create(AppModule, { bufferLogs: false });

  const logger = await app.resolve(Logger);

  // Set custom logger service
  app.useLogger(logger);
  app.setGlobalPrefix(globalPrefix);

  // Configure morgan to have some log of what is going on on the api
  app.use(morgan('combined'));

  // Set global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
        exposeDefaultValues: true,
      },
    }),
  );

  // Set swagger documentation
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cali API')
    .setDescription('Documentation of the cali REST API')
    .setVersion('1.0')
    .addTag('swagger')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, swaggerDocument);

  // Start app and define port
  await app.listen(port, () => {
    logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap().catch((e) => {
  console.error('Failed to start the server. See the error below.');
  console.error(e);
});
