import { Module } from '@nestjs/common';
import { CoreModule } from '@tractr/hapify-plugin-nestjs-core';
import { AppController } from './controllers';
import { ModelsModule } from './generated';

@Module({
  imports: [CoreModule, ModelsModule.register()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
