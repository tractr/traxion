import { AnyAbility } from '@casl/ability';
import { DynamicModule, Module } from '@nestjs/common';

import { CASL_MODULE_OPTIONS } from './casl.constant';
import { CaslOptions } from './interfaces';
import { CaslAbilityFactoryService } from './services/casl.service';

import { AuthenticationModule } from '@trxn/nestjs-authentication';
import { AsyncOptions, ModuleOptionsFactory } from '@trxn/nestjs-core';

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [CaslAbilityFactoryService],
  exports: [CaslAbilityFactoryService],
})
export class CaslModule extends ModuleOptionsFactory<CaslOptions>(
  CASL_MODULE_OPTIONS,
) {
  static register<T extends AnyAbility>(
    options: CaslOptions<T>,
  ): DynamicModule {
    return super.register(options as CaslOptions);
  }

  static registerAsync<T extends AnyAbility>(
    options: AsyncOptions<CaslOptions<T>>,
  ): DynamicModule {
    return super.registerAsync(options as AsyncOptions<CaslOptions>);
  }
}
