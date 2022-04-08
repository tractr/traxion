import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { RequestTimestampMiddleware } from './request-timestamp.middleware';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class RequestTimestampModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTimestampMiddleware).forRoutes('*');
  }
}
