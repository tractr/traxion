import { Module } from '@nestjs/common';

import { EncryptionModule } from './encryption.module';

import {
  ModelsModule as TraxionModelsModule,
  UserMiddlewareModule,
} from '@trxn/generated-nestjs-models';
import { BcryptService } from '@trxn/nestjs-bcrypt';

@Module({
  imports: [
    UserMiddlewareModule.registerAsync({
      imports: [EncryptionModule],
      inject: [BcryptService],
      useFactory: (bcryptService: BcryptService) => ({
        encryptionService: bcryptService,
      }),
    }),
    TraxionModelsModule,
  ],
  exports: [TraxionModelsModule],
})
export class ModelsModule {}
