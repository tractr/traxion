/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamicModule,
  ForwardReference,
  InjectionToken,
  Provider,
  Type,
} from '@nestjs/common';

import type { ProviderWithInjectionToken } from '../interfaces';

export type ImportsExtra = {
  imports: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
};

export type ProvidersExtra = {
  providers?: Provider<any>[] | undefined;
};

export function addImportsExtra<E extends ImportsExtra>(
  transformDefinition: (
    definition: DynamicModule,
    extras: Omit<E, 'imports'>,
  ) => DynamicModule,
) {
  return (definition: DynamicModule, { imports, ...extras }: E) =>
    transformDefinition(
      {
        ...definition,
        imports: [...(definition.imports || []), ...(imports || [])],
      },
      extras,
    );
}

export function addProvidersExtra<E extends ProvidersExtra>(
  transformDefinition: (
    definition: DynamicModule,
    extras: Omit<E, 'providers'>,
  ) => DynamicModule,
) {
  return (definition: DynamicModule, { providers, ...extras }: E) =>
    transformDefinition(
      {
        ...definition,
        providers: [...(definition.providers || []), ...(providers || [])],
      },
      extras,
    );
}

export function addImportsAndProvidersExtra<
  E extends ImportsExtra & ProvidersExtra,
>(
  transformDefinition: (
    definition: DynamicModule,
    extras: Omit<E, 'imports' | 'providers'>,
  ) => DynamicModule,
) {
  return (definition: DynamicModule, { imports, providers, ...extras }: E) =>
    transformDefinition(
      {
        ...definition,
        imports: [...(definition.imports || []), ...(imports || [])],
        providers: [...(definition.providers || []), ...(providers || [])],
      },
      extras,
    );
}

export function addProviderWithInjectionTokenExtra<I extends InjectionToken>(
  definition: DynamicModule,
  token: I,
  providerWithToken?: ProviderWithInjectionToken<I>,
) {
  if (!providerWithToken) {
    return definition;
  }

  let provider: Provider = providerWithToken;
  if (!('provide' in provider)) {
    provider = {
      provide: token,
      useClass: provider,
    };
  }

  return {
    ...definition,
    providers: [...(definition.providers || []), provider],
  };
}
