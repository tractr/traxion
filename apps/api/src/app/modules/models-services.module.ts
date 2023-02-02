import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { DatabaseModule } from './database.module';
import { EncryptionModule } from './encryption.module';

import {
  ModelsModule as TraxionModelsModule,
  UserMiddlewareModule,
} from '@trxn/generated-nestjs-models';
import { ModelsServicesModule as ServicesModule } from '@trxn/generated-nestjs-models-common';
import { ModelsRestModule } from '@trxn/generated-nestjs-models-rest';
import { BcryptService } from '@trxn/nestjs-bcrypt';
import { DATABASE_SERVICE } from '@trxn/nestjs-database';

@Module({
  imports: [
    // UserMiddlewareModule.registerAsync({
    //   imports: [EncryptionModule],
    //   inject: [BcryptService],
    //   useFactory: (bcryptService: BcryptService) => ({
    //     encryptionService: bcryptService,
    //   }),
    // }),

    ServicesModule.register({
      imports: [DatabaseModule],
    }),
  ],
  exports: [ServicesModule],
})
export class ModelsServicesModule {}
