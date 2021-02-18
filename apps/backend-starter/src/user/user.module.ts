import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { LogModule } from '../core';
import {
  AuthService,
  UserService,
  UserDatabaseService,
  getAuthConfig,
  JwtAuthGuard,
  JwtStrategy,
  LocalStrategy,
} from './common';
import { LoginController, UserController, UserRestDtoService } from './rest';
import { UserResolver } from './graphql';
import { DateScalar } from './graphql/scalars/date.scalar';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';

const { jwt, passport } = getAuthConfig();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getAuthConfig] }),
    DatabaseModule,
    LogModule,
    PassportModule.register(passport),
    JwtModule.register(jwt),
  ],
  providers: [
    DateScalar,
    UserResolver,
    AuthService,
    UserService,
    UserDatabaseService,
    UserRestDtoService,
    JwtStrategy,
    LocalStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [LoginController, UserController],
})
export class UserModule {}
