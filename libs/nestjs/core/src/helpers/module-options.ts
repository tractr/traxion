/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DynamicModule,
  FactoryProvider,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';

import { TransformAndValidate } from '@tractr/common';

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
  PublicOptions extends Partial<InternalOptions> = Partial<InternalOptions>,
  DefaultOptions extends Omit<
    InternalOptions,
    keyof Required<PublicOptions>
  > = Omit<InternalOptions, keyof Required<PublicOptions>>,
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
  PublicOptions extends Partial<InternalOptions> = Partial<InternalOptions>,
  DefaultOptions extends Omit<
    InternalOptions,
    keyof Required<PublicOptions>
  > = Omit<InternalOptions, keyof Required<PublicOptions>>,
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
  ) => Promise<InternalOptions | undefined> | InternalOptions | undefined;
  inject?: FactoryProvider['inject'];
};

/**
 * The ModuleOptionsHelper that need to be extends to get access
 * to the register registerAsync forRoot and forRootAsync
 */
export function ModuleOptionsFactory<
  InternalOptions,
  PublicOptions extends Partial<InternalOptions> = Partial<InternalOptions>,
  DefaultOptions extends Omit<
    InternalOptions,
    keyof Required<PublicOptions>
  > = Omit<InternalOptions, keyof Required<PublicOptions>>,
  Factory extends OptionsFactory<
    InternalOptions,
    PublicOptions,
    DefaultOptions
  > = OptionsFactory<InternalOptions, PublicOptions, DefaultOptions>,
>(
  moduleOptionsProvide: string,
  validateOrDefault: DefaultOptions | TransformAndValidate<InternalOptions>,
) {
  const validate: TransformAndValidate<InternalOptions> =
    typeof validateOrDefault !== 'function'
      ? (opts: any) => opts
      : validateOrDefault;
  const defaultOptions: DefaultOptions = (
    typeof validateOrDefault === 'function' ? {} : validateOrDefault
  ) as DefaultOptions;

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
            useValue: validate({ ...defaultOptions, ...(options || {}) }),
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
          useFactory: async (...args) =>
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
