import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  await NestFactory.create(AppModule);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
