import { plural } from 'pluralize';
import type { Function } from 'ts-toolbelt';

import type { BaseFieldPropertiesKeys, ExtractField } from '../base-types';
import type { Field, FieldType } from '../field';
import type { CreateFieldOptions } from '../helpers';
import { getScalarFromType } from '../helpers/get-scalar-from-type';

/**
 * Factory to create a function that initialize a field
 *
 * @param type - Type of the field to initialize
 * @param defaultConstraints - Constraints to apply by default to the field to initialize
 * @param defaultOptions - Options to apply by default to the field to initialize
 * @returns Function to initialize a field
 */
export const createFieldFactory =
  <
    T extends FieldType,
    DC extends Partial<
      Omit<ExtractField<T>, BaseFieldPropertiesKeys | 'scalar'>
    >,
    DO extends CreateFieldOptions<ExtractField<T>>,
  >(
    type: T,
    defaultConstraints?: Function.Narrow<DC>,
    defaultOptions?: Function.Narrow<DO>,
  ) =>
  <
    N extends string,
    C extends Omit<ExtractField<T>, BaseFieldPropertiesKeys | 'scalar'>,
    // TODO: we should exclude pluralName
    O extends CreateFieldOptions<ExtractField<T>>,
  >(
    // TODO: update return function params to be dynamic depending on the type of DC et DP
    name: Function.Narrow<N>,
    constraints?: Function.Narrow<C>,
    options?: Function.Narrow<O>,
  ) =>
    ({
      type,
      name,
      scalar: getScalarFromType(type),
      pluralName: plural(name as string),
      ...(defaultConstraints as object),
      ...(constraints as object),
      ...(defaultOptions as object),
      ...(options as object),
    } as unknown as { type: T; name: N; pluralName: string } & ExtractField<
      T,
      Field
    > &
      C &
      DC &
      O &
      DO);
