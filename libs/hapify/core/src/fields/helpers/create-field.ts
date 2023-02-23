/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { plural } from 'pluralize';
import type { Function } from 'ts-toolbelt';

import {
  BaseField,
  BaseProperties,
  ExtractField,
  GetConstraintsNames,
  GetType,
} from '../base-types';
import { Field } from '../field';

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
  T extends GetType<Field>,
  F extends ExtractField<Field, T>,
  N extends string,
  O extends CreateFieldOptions<F>,
  C extends Omit<F, 'type' | keyof BaseProperties>,
>(
  type: T,
  name: Function.Narrow<N>,
  constraints: Function.Narrow<C>,
  options?: Function.Narrow<O>,
): Omit<F, keyof C> & C & { name: N } & O {
  return {
    type,
    name,
    pluralName: plural(name as string),
    ...(constraints as object),
    ...(options as object),
  } as unknown as Omit<F, keyof C> & C & { name: N } & O;
}
