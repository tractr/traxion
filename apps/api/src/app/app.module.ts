import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ConsoleModule } from 'nestjs-console';

import {
  getSelectPrismaUserQuery,
  rolePermissions,
} from '@tractr/generated-casl';
import { GraphQLModelsModule } from '@tractr/generated-nestjs-graphql';
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
import { LoggerModule, PrismaExceptionInterceptor } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';
import {
  FileStorageController,
  FileStorageModule,
} from '@tractr/nestjs-file-storage';
import { MailerModule } from '@tractr/nestjs-mailer';

@Module({
  imports: [
    GraphQLModelsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [GraphQLModelsModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
    }),
    ModelsModule,
    DatabaseModule.register(),
    AuthenticationModule.registerAsync({
      useFactory: (defaultOptions) => ({
        ...defaultOptions,
        userConfig: {
          ...defaultOptions.userConfig,
          customSelect: getSelectPrismaUserQuery(),
        },
        cookies: {
          ...defaultOptions.cookies,
          cookieName: 'authCookie',
          queryParamName: 'authToken',
        },
        jwtModuleOptions: {
          ...defaultOptions.jwtModuleOptions,
          secret: 'secret',
        },
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
    LoggerModule,
  ],
  controllers: [FileStorageController],
  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
    { provide: APP_INTERCEPTOR, useClass: PrismaExceptionInterceptor },
  ],
})
export class AppModule {}
