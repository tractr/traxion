/* eslint-disable @typescript-eslint/no-explicit-any */
import pluralize = require('pluralize');
import type { Function } from 'ts-toolbelt';

import { BaseFieldPropertiesKeys, ExtractField, GetField } from '../base-types';
import { Field, FieldType } from '../field';
import { CreateFieldOptions } from '../helpers';
import { getScalarFromType } from '../helpers/get-scalar-from-type';

/**
 * Factory to create a field
 * @param type
 * @param defaultConstraints
 * @param defaultOptions
 * @returns
 */
export const createFieldFactory =
  <
    T extends FieldType,
    DC extends Partial<Omit<ExtractField<T>, BaseFieldPropertiesKeys>>,
    DO extends CreateFieldOptions<ExtractField<T>>,
  >(
    type: T,
    defaultConstraints?: Function.Narrow<DC>,
    defaultOptions?: Function.Narrow<DO>,
  ) =>
  <
    N extends string,
    C extends Omit<ExtractField<T>, BaseFieldPropertiesKeys>,
    O extends CreateFieldOptions<ExtractField<T>>,
  >(
    name: Function.Narrow<N>,
    constraints?: Function.Narrow<C>,
    options?: Function.Narrow<O>,
  ) =>
    ({
      type,
      name,
      scalar: typeof type === 'string' ? getScalarFromType(type) : null,
      pluralName: typeof name === 'string' ? pluralize(name) : name,
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
