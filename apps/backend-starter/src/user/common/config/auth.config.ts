import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';
import { User } from '@prisma/client';

export interface AuthConfig {
  jwt: JwtModuleOptions;
  passport: IAuthModuleOptions;
  login: {
    password: {
      saltLength: number;
    };
    loginField: keyof User;
  };
}

export function getAuthConfig(): AuthConfig {
  const {
    TRACTR_USER_JWT_SECRET,
    TRACTR_USER_JWT_EXPIRES_IN,
    TRACTR_USER_PASSWORD_SALT_LENGTH,
    TRACTR_USER_LOGIN_FIELD,
  } = process.env;

  return {
    jwt: {
      secret: TRACTR_USER_JWT_SECRET ?? 'developmentSecret',
      signOptions: {
        expiresIn: Number(TRACTR_USER_JWT_EXPIRES_IN ?? '3600'),
        // TODO: get more inside on what we want to customize
      },
    },
    passport: {
      defaultStrategy: 'jwt',
    },
    login: {
      password: {
        saltLength: Number(TRACTR_USER_PASSWORD_SALT_LENGTH ?? '20'),
      },
      loginField: (TRACTR_USER_LOGIN_FIELD as keyof User) ?? 'email',
    },
  };
}
