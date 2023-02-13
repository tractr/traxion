/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';

export type ImportsAndProvidersSetExtras = {
  imports: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  providers?: Provider<any>[] | undefined;
};

export function addImportsAndProvidersTransformDefinition(
  definition: DynamicModule,
  extras: ImportsAndProvidersSetExtras,
): DynamicModule {
  return {
    ...definition,
    imports: [...(definition.imports || []), ...(extras.imports || [])],
    providers: [...(definition.providers || []), ...(extras.providers || [])],
  };
}
