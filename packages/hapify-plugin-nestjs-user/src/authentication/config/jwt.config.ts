import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    const { NODE_ENV, TRACTR_AUTH_STRATEGY_JWT_SECRET } = process.env;

    const secret =
      TRACTR_AUTH_STRATEGY_JWT_SECRET ?? NODE_ENV === 'development'
        ? 'secret'
        : undefined;

    return {
      secret,
    };
  }
}
