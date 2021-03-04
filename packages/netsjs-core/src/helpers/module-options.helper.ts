import {
  DynamicModule,
  FactoryProvider,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';

export interface Options {
  [key: string]: unknown;
}

export interface OptionsFactory<O = Options> {
  createOptions(): Promise<O> | O;
}

export interface AsyncOptions<
  O,
  F extends OptionsFactory<O> = OptionsFactory<O>
> extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<F>;
  useClass?: Type<F>;
  useFactory?: (...args: unknown[]) => Promise<O> | O;
  inject?: FactoryProvider['inject'];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ModuleOptionsHelper<
  O,
  F extends OptionsFactory<O> = OptionsFactory<O>
>() {
  return class ModuleOptions {
    static moduleOptionsProvide = 'moduleOptions';

    static register(options: O): DynamicModule {
      return {
        module: this,
        providers: [{ provide: this.moduleOptionsProvide, useValue: options }],
        exports: [this.moduleOptionsProvide],
      };
    }

    static registerAsync(options: AsyncOptions<O, F>): DynamicModule {
      return {
        module: this,
        imports: options.imports || [],
        providers: this.createAsyncProviders(options),
        exports: [this.moduleOptionsProvide],
      };
    }

    static createAsyncProviders(options: AsyncOptions<O, F>): Provider[] {
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

    static createAsyncOptionsProvider(options: AsyncOptions<O, F>): Provider {
      if (options.useFactory) {
        return {
          provide: this.moduleOptionsProvide,
          useFactory: options.useFactory,
          inject: options.inject || [],
        };
      }

      return {
        provide: this.moduleOptionsProvide,
        useFactory: async (optionsFactory: F) => optionsFactory.createOptions(),
        ...(options.useExisting ? { inject: [options.useExisting] } : {}),
        ...(options.useClass ? { inject: [options.useClass] } : {}),
      };
    }
  };
}
