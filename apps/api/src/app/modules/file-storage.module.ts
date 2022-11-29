import { Module } from '@nestjs/common';

import {
  FileStorageController,
  FileStorageModule as TraxionFileStorageModule,
} from '@trxn/nestjs-file-storage';

@Module({
  imports: [
    TraxionFileStorageModule.registerAsync({
      useFactory: (defaultConfig) => ({
        ...defaultConfig,
        accessKey: 'minio',
        secretKey: 'password',
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,
        defaultBucket: 'bucket',
      }),
    }),
  ],
  exports: [TraxionFileStorageModule],
  controllers: [FileStorageController],
})
export class FileStorageModule {}
