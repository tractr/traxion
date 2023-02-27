/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  InjectionToken,
  Type,
  ValueProvider,
} from '@nestjs/common';

export type ClassProviderWithInjectionToken<
  I = InjectionToken,
  T = any,
> = ClassProvider<T> & { provide: I };
export type ValueProviderWithInjectionToken<
  I = InjectionToken,
  T = any,
> = ValueProvider<T> & { provide: I };
export type FactoryProviderWithInjectionToken<
  I = InjectionToken,
  T = any,
> = FactoryProvider<T> & { provide: I };
export type ExistingProviderWithInjectionToken<
  I = InjectionToken,
  T = any,
> = ExistingProvider<T> & { provide: I };

export type ProviderWithInjectionToken<I = InjectionToken, T = any> =
  | Type<T>
  | ClassProviderWithInjectionToken<I, T>
  | ValueProviderWithInjectionToken<I, T>
  | FactoryProviderWithInjectionToken<I, T>
  | ExistingProviderWithInjectionToken<I, T>;
