import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConsoleModule } from 'nestjs-console';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  getSelectPrismaUserQuery,
  rolePermissions,
} from '@tractr/generated-casl';
import { ModelsModule } from '@tractr/generated-nestjs-models';
import { USER_SERVICE } from '@tractr/generated-nestjs-models-common';
import {
  AuthenticationModule,
  JwtGlobalAuthGuard,
} from '@tractr/nestjs-authentication';
import {
  CaslExceptionInterceptor,
  CaslModule,
  PoliciesGuard,
} from '@tractr/nestjs-casl';
import { LoggerModule } from '@tractr/nestjs-core';
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
      getSelectPrismaUserQuery,
    }),
    ConsoleModule,
    LoggerModule,
  ],
  controllers: [AppController, FileStorageController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
})
export class AppModule {}
