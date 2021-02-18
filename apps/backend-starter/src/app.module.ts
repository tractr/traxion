import { Module } from '@nestjs/common';
import { CoreModule } from '@tractr/hapify-plugin-nestjs-core';
import { AppController } from './controllers';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
