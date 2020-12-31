import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule, LogModule } from '../core';
import { getAuthConfig } from './config';
import { LoginController, UserController } from './controllers';
import { JwtAuthGuard } from './guards';
import { UserResolver } from './resolvers';
import { AuthService, UserService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

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
    UserResolver,
    AuthService,
    UserService,
    JwtStrategy,
    LocalStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [LoginController, UserController],
})
export class UserModule {}
