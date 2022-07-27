import { AnyAbility } from '@casl/ability';
import { DynamicModule, Module } from '@nestjs/common';

import { CASL_MODULE_OPTIONS } from './casl.constant';
import { CaslOptions } from './interfaces';
import { CaslAbilityFactoryService } from './services/casl.service';

import { CaslUser } from '@tractr/common';
import { AuthenticationModule } from '@tractr/nestjs-authentication';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [CaslAbilityFactoryService],
  exports: [CaslAbilityFactoryService],
})
export class CaslModule extends ModuleOptionsFactory<CaslOptions>(
  CASL_MODULE_OPTIONS,
) {
  static register<
    CustomRoles extends string = never,
    CustomUser extends CaslUser<CustomRoles> = CaslUser<CustomRoles>,
    CustomAbility extends AnyAbility = AnyAbility,
  >(
    options?: CaslOptions<CustomRoles, CustomUser, CustomAbility>,
  ): DynamicModule {
    return super.register(options as unknown as CaslOptions);
  }

  static registerAsync<
    CustomRoles extends string = never,
    CustomUser extends CaslUser<CustomRoles> = CaslUser<CustomRoles>,
    CustomAbility extends AnyAbility = AnyAbility,
  >(
    options: AsyncOptions<CaslOptions<CustomRoles, CustomUser, CustomAbility>>,
  ): DynamicModule {
    return super.registerAsync(options as unknown as AsyncOptions<CaslOptions>);
  }
}
