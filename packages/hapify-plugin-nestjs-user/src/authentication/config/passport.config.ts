import { AuthOptionsFactory, IAuthModuleOptions } from '@nestjs/passport';

export class PassportAuthOptionsFactory implements AuthOptionsFactory {
  createAuthOptions(): Promise<IAuthModuleOptions> | IAuthModuleOptions {
    return {
      defaultStrategy: 'jwt',
    };
  }
}
