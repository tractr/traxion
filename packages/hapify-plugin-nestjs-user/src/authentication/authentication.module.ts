import { Module } from '@nestjs/common';
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

const { jwt, passport } = getAuthConfig();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getAuthConfig] }),
    DatabaseModule,
    LogModule,
    PassportModule.register(passport),
    JwtModule.register(jwt),
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
})
export class AuthenticationModule {}
