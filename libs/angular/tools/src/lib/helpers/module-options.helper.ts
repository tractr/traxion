/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FactoryProvider,
  InjectionToken,
  ModuleWithProviders,
  Provider,
  Type,
} from '@angular/core';
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
  createOptions(defaultOptions: DefaultOptions): InternalOptions;
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
> = {
  useExisting?: Type<Factory>;
  useClass?: Type<Factory>;
  useFactory?: (
    defaultOptions: DefaultOptions,
    ...args: any[]
  ) => Promise<InternalOptions | undefined> | InternalOptions | undefined;
  deps?: FactoryProvider['deps'];
};

/**
 * The ModuleOptionsHelper that need to be extends to get access
 * to the register registerAsync forRoot and forRootAsync
 *
 * @deprecated async options are not supported correctly in angular, use the forRoot directly. Moreover try to use standalone components instead of modules
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
  moduleOptionsProvide: string | InjectionToken<InternalOptions>,
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
  return class {
    /**
     * Register the options of the module
     * @param options The options to register
     * @returns a dynamic module with a `moduleOptionsProvide` provider that will host the configuration
     */
    static register(options?: PublicOptions): ModuleWithProviders<any> {
      const opts = validate({
        ...defaultOptions,
        ...(options ?? {}),
      });
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
          useFactory: (...args: unknown[]) =>
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
