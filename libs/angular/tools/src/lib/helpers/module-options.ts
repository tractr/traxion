/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FactoryProvider,
  InjectionToken,
  ModuleWithProviders,
  Provider,
  Type,
} from '@angular/core';
import { RequiredKeys } from 'ts-essentials';

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
    RequiredKeys<PublicOptions>
  > = Omit<InternalOptions, RequiredKeys<PublicOptions>>,
> {
  createOptions(defaultOptions: DefaultOptions): InternalOptions;
}

/**
 * Interface of the async options used in registerAsync or forRootAsync
 */
export type AsyncOptions<
  InternalOptions,
  PublicOptions extends Partial<InternalOptions> = Partial<InternalOptions>,
  DefaultOptions extends Omit<
    InternalOptions,
    RequiredKeys<PublicOptions>
  > = Omit<InternalOptions, RequiredKeys<PublicOptions>>,
  Factory extends OptionsFactory<
    InternalOptions,
    PublicOptions,
    DefaultOptions
  > = OptionsFactory<InternalOptions, PublicOptions, DefaultOptions>,
> = {
  useExisting?: Type<Factory>;
  useClass?: Type<Factory>;
  useFactory?: (
    defaultOptions: DefaultOptions,
    ...args: any[]
  ) => InternalOptions | undefined;
  deps?: FactoryProvider['deps'];
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
    RequiredKeys<PublicOptions>
  > = Omit<InternalOptions, RequiredKeys<PublicOptions>>,
  Factory extends OptionsFactory<
    InternalOptions,
    PublicOptions,
    DefaultOptions
  > = OptionsFactory<InternalOptions, PublicOptions, DefaultOptions>,
>(
  moduleOptionsProvide: string | InjectionToken<InternalOptions>,
  validateOrDefault?: DefaultOptions | TransformAndValidate<InternalOptions>,
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
  return class {
    /**
     * Register the options of the module
     * @param options The options to register
     * @returns a dynamic module with a `moduleOptionsProvide` provider that will host the configuration
     */
    static register(options?: PublicOptions): ModuleWithProviders<any> {
      const opts = {
        ...defaultOptions,
        ...(options ?? {}),
      };
      return {
        ngModule: this,
        providers: [
          {
            provide: moduleOptionsProvide,
            useValue: opts,
          },
        ],
      };
    }

    /**
     * @alias ModuleOptions.register
     */
    static forRoot(options?: PublicOptions): ModuleWithProviders<any> {
      return this.register(options);
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
    ): ModuleWithProviders<any> {
      return {
        ngModule: this,
        providers: this.createAsyncProviders(options),
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
    ): ModuleWithProviders<any> {
      return this.registerAsync(options);
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
          useFactory: (...args: any[]) =>
            validate(
              (options.useFactory &&
                options.useFactory(defaultOptions, ...args)) ||
                defaultOptions,
            ),
          deps: options.deps || [],
        };
      }

      if (options.useClass || options.useExisting) {
        const deps = [options.useClass || options.useExisting];

        return {
          provide: moduleOptionsProvide,
          useFactory: (optionsFactory: Factory) =>
            validate(optionsFactory.createOptions(defaultOptions || {})),
          deps,
        };
      }

      throw new Error(
        'registerAsync or forRootAsync you must use one of useExisting, useClass or useFactory',
      );
    }
  };
}
