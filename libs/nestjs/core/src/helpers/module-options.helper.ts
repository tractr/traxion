/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DynamicModule,
  FactoryProvider,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { RequiredKeys } from 'ts-essentials';

import {
  getDefaults,
  isClass,
  transformAndValidate,
  TransformAndValidate,
} from '@trxn/common';

/**
 * Default Options interface
 */
export interface Options {
  [key: string]: unknown;
}

/**
 * The default interface of the Options Factory
 */
export interface OptionsFactory<
  InternalOptions = Options,
  PublicOptions = Partial<InternalOptions>,
  DefaultOptions extends Omit<
    InternalOptions,
    RequiredKeys<PublicOptions>
  > = Omit<InternalOptions, RequiredKeys<PublicOptions>>,
> {
  createOptions(
    defaultOptions: DefaultOptions,
  ): Promise<InternalOptions> | InternalOptions;
}

/**
 * Interface of the async options used in registerAsync or forRootAsync
 */
export type AsyncOptions<
  InternalOptions,
  PublicOptions = Partial<InternalOptions>,
  DefaultOptions extends Omit<
    InternalOptions,
    RequiredKeys<PublicOptions>
  > = Omit<InternalOptions, RequiredKeys<PublicOptions>>,
  Factory extends OptionsFactory<
    InternalOptions,
    PublicOptions,
    DefaultOptions
  > = OptionsFactory<InternalOptions, PublicOptions, DefaultOptions>,
> = Pick<ModuleMetadata, 'imports'> & {
  useExisting?: Type<Factory>;
  useClass?: Type<Factory>;
  useFactory?: (
    defaultOptions: DefaultOptions,
    ...args: any[]
  ) => Promise<PublicOptions | undefined> | PublicOptions | undefined;
  inject?: FactoryProvider['inject'];
};

/**
 * The ModuleOptionsHelper that need to be extends to get access
 * to the register registerAsync forRoot and forRootAsync
 */
export function ModuleOptionsFactory<
  InternalOptions,
  PublicOptions = Partial<InternalOptions>,
  DefaultOptions extends Omit<
    InternalOptions,
    RequiredKeys<PublicOptions>
  > = Omit<InternalOptions, RequiredKeys<PublicOptions>>,
  Factory extends OptionsFactory<
    InternalOptions,
    PublicOptions,
    DefaultOptions
  > = OptionsFactory<InternalOptions, PublicOptions, DefaultOptions>,
>(
  moduleOptionsProvide: string,
  validateOrDefault?:
    | DefaultOptions
    | ClassConstructor<InternalOptions>
    | TransformAndValidate<InternalOptions>,
) {
  let validate: TransformAndValidate<InternalOptions> = (opts: any) => opts;

  if (isClass(validateOrDefault))
    validate = transformAndValidate(validateOrDefault);
  else if (typeof validateOrDefault === 'function')
    validate = validateOrDefault;

  let defaultOptions: DefaultOptions = {} as DefaultOptions;

  if (isClass(validateOrDefault))
    defaultOptions = getDefaults(
      validateOrDefault,
    ) as unknown as DefaultOptions;
  else if (
    typeof validateOrDefault === 'object' &&
    !Array.isArray(validateOrDefault) &&
    validateOrDefault !== null
  )
    defaultOptions = validateOrDefault;

  /**
   * The Module Options class that will be extends
   */
  return class ModuleOptions {
    /**
     * Register the options of the module
     * @param options The options to register
     * @returns a dynamic module with a `moduleOptionsProvide` provider that will host the configuration
     */
    static register(options?: PublicOptions): DynamicModule {
      return {
        module: this,
        providers: [
          {
            provide: moduleOptionsProvide,
            useValue: validate({ ...defaultOptions, ...(options ?? {}) }),
          },
        ],
        exports: [moduleOptionsProvide],
      };
    }

    /**
     * @alias ModuleOptions.register
     */
    static forRoot(options?: PublicOptions): DynamicModule {
      return ModuleOptions.register(options);
    }

    /**
     * Register the options using injection dependencies
     *
     * Three way are existing
     * @param options
     * @returns
     */
    static registerAsync(
      options: AsyncOptions<
        InternalOptions,
        PublicOptions,
        DefaultOptions,
        Factory
      >,
    ): DynamicModule {
      return {
        module: this,
        imports: options.imports || [],
        providers: this.createAsyncProviders(options),
        exports: [moduleOptionsProvide],
      };
    }

    /**
     * @alias ModuleOptions.registerAsync
     */
    static forRootAsync(
      options: AsyncOptions<
        InternalOptions,
        PublicOptions,
        DefaultOptions,
        Factory
      >,
    ): DynamicModule {
      return ModuleOptions.registerAsync(options);
    }

    /**
     * Helper to create an async provider that will inject the options and the defaults
     * @param options
     * @returns
     */
    static createAsyncProviders(
      options: AsyncOptions<
        InternalOptions,
        PublicOptions,
        DefaultOptions,
        Factory
      >,
    ): Provider[] {
      if (options.useExisting || options.useFactory) {
        return [this.createAsyncOptionsProvider(options)];
      }

      if (options.useClass) {
        return [
          this.createAsyncOptionsProvider(options),
          {
            provide: options.useClass,
            useClass: options.useClass,
          },
        ];
      }

      return [];
    }

    /**
     * Helper to create an async provider that will inject the options and the defaults
     * @param options
     * @returns
     */
    static createAsyncOptionsProvider(
      options: AsyncOptions<
        InternalOptions,
        PublicOptions,
        DefaultOptions,
        Factory
      >,
    ): Provider {
      if (options.useFactory) {
        return {
          provide: moduleOptionsProvide,
          useFactory: async (...args: unknown[]) =>
            validate(
              await ((options.useFactory &&
                options.useFactory(defaultOptions, ...args)) ||
                defaultOptions),
            ),
          inject: options.inject || [],
        };
      }

      if (options.useClass || options.useExisting) {
        const inject = [
          options.useClass || options.useExisting,
        ] as unknown as Type<Factory>[];

        return {
          provide: moduleOptionsProvide,
          useFactory: async (optionsFactory: Factory) =>
            validate(await optionsFactory.createOptions(defaultOptions || {})),
          inject,
        };
      }

      throw new Error(
        'registerAsync or forRootAsync you must use one of useExisting, useClass or useFactory',
      );
    }
  };
}
