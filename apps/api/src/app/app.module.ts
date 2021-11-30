import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConsoleModule } from 'nestjs-console';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { rolePermissions } from '@generated/casl';
import { ModelsModule } from '@generated/nestjs-models';
import { USER_SERVICE } from '@generated/nestjs-models-common';
import {
  AuthenticationModule,
  JwtGlobalAuthGuard,
} from '@tractr/nestjs-authentication';
import { CaslModule } from '@tractr/nestjs-casl';
import { DatabaseModule } from '@tractr/nestjs-database';
import {
  FileStorageController,
  FileStorageModule,
  PresignedDownloadConfiguration,
  PresignedUploadConfiguration,
} from '@tractr/nestjs-file-storage';
import { MailerModule } from '@tractr/nestjs-mailer';

@Module({
  imports: [
    ModelsModule.register(),
    DatabaseModule.register(),
    AuthenticationModule.registerAsync({
      useFactory: (defaultOptions) => ({
        ...defaultOptions,
        userService: USER_SERVICE,
      }),
    }),
    FileStorageModule.registerAsync({
      useFactory: (defaultConfig) => ({
        ...defaultConfig,
        accessKey: 'minio',
        secretKey: 'password',
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,
        defaultBucket: 'bucket',
        presignedDownload: {} as PresignedDownloadConfiguration,
        presignedUpload: {} as PresignedUploadConfiguration,
      }),
    }),
    MailerModule.registerAsync({
      useFactory: () => ({
        privateApiKey: 'test',
        publicApiKey: 'test',
      }),
    }),
    CaslModule.register({
      rolePermissions,
    }),
    ConsoleModule,
  ],
  controllers: [AppController, FileStorageController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGlobalAuthGuard }],
})
export class AppModule {}
