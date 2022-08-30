import { Module } from '@nestjs/common';

import { EncryptionModule } from './encryption.module';

import {
  ModelsModule as ModelsModuleGenerated,
  UserMiddlewareModule,
} from '@tractr/generated-nestjs-models';
import { BcryptService } from '@tractr/nestjs-bcrypt';

@Module({
  imports: [
    UserMiddlewareModule.registerAsync({
      imports: [EncryptionModule],
      inject: [BcryptService],
      useFactory: (bcryptService: BcryptService) => ({
        encryptionService: bcryptService,
      }),
    }),
  ],
  exports: [ModelsModuleGenerated],
})
export class ModelsModule {}
