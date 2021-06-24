import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthenticationModule } from '@tractr/nestjs-authentication';
import { DatabaseModule } from '@tractr/nestjs-database';

@Module({
  imports: [DatabaseModule.register(), AuthenticationModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
