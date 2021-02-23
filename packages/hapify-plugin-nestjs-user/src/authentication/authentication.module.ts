import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule, LogModule } from '../core';
import { getAuthConfig } from './config';
import { JwtAuthGuard } from './guards';
import { LoginController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UserCustomService } from './services/user-customservice';
import { ModelsModule } from '../generated.example/models.module';
import { UserModelModule, UserModule } from '../generated.example/user';
import { ModuleOverrideMetadata } from '../generated.example/common/helpers/base-module.helper';

const { jwt, passport } = getAuthConfig();

@Module({})
export class AuthenticationModule {
  static register(
    options: ModuleOverrideMetadata = {},
    models:
      | typeof ModelsModule
      | typeof UserModule
      | typeof UserModelModule = UserModelModule
  ): DynamicModule {
    return {
      module: AuthenticationModule,
      imports: [
        ConfigModule.forRoot({ load: [getAuthConfig] }),
        DatabaseModule,
        LogModule,
        PassportModule.register(passport),
        JwtModule.register(jwt),
        models.register(options),
      ],
      exports: [AuthService, JwtStrategy, LocalStrategy],
      providers: [
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        AuthService,
        JwtStrategy,
        LocalStrategy,
        UserCustomService,
      ],
      controllers: [LoginController],
    };
  }
}
