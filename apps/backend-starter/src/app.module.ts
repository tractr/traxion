import { Module } from '@nestjs/common';
import { CoreModule } from '@tractr/hapify-plugin-nestjs-core';
import { AuthenticationModule } from '@tractr/hapify-plugin-nestjs-user';

import { AppController } from './controllers';

@Module({
  imports: [CoreModule, AuthenticationModule.register()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
