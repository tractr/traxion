/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { plural } from 'pluralize';
import type { Function } from 'ts-toolbelt';

import {
  BaseField,
  BaseFieldPropertiesKeys,
  ExtractField,
  GetConstraintsNames,
  GetField,
} from '../base-types';
import { Field, FieldType } from '../field';

/**
 * Get the field options from BaseField
 */
export type CreateFieldOptions<F extends BaseField> = Partial<
  Omit<F, 'name' | 'type' | GetConstraintsNames<F>>
>;

/**
 * Create a field factory
 * @param type
 * @param name
 * @param constraints
 * @param options
 * @returns
 */
export function createField<
  T extends FieldType,
  C extends Omit<GetField<Field, T>, BaseFieldPropertiesKeys>,
  N extends string,
  O extends CreateFieldOptions<GetField<Field, T>>,
>(
  type: T,
  name: Function.Narrow<N>,
  constraints: Function.Narrow<C>,
  options?: Function.Narrow<O>,
) {
  return {
    type,
    name,
    pluralName: plural(name as string),
    ...(constraints as object),
    ...(options as object),
  } as unknown as { type: T; name: N; pluralName: string } & ExtractField<
    Field,
    T
  > &
    C &
    O;
}
