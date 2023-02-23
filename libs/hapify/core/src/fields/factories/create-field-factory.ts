/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Function } from 'ts-toolbelt';

import { BaseFieldPropertiesKeys, ExtractField, GetField } from '../base-types';
import { Field, FieldType } from '../field';
import { CreateFieldOptions } from '../helpers';

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
    DC extends Partial<Omit<GetField<Field, T>, BaseFieldPropertiesKeys>>,
    DO extends CreateFieldOptions<GetField<Field, T>>,
  >(
    type: T,
    defaultConstraints?: Function.Narrow<DC>,
    defaultOptions?: Function.Narrow<DO>,
  ) =>
  <
    N extends string,
    C extends Omit<GetField<Field, T>, BaseFieldPropertiesKeys>,
    O extends CreateFieldOptions<GetField<Field, T>>,
  >(
    name: Function.Narrow<N>,
    constraints?: Function.Narrow<C>,
    options?: Function.Narrow<O>,
  ) =>
    ({
      type,
      name,
      ...(defaultConstraints as object),
      ...(constraints as object),
      ...(defaultOptions as object),
      ...(options as object),
    } as unknown as { type: T; name: N; pluralName: string } & ExtractField<
      Field,
      T
    > &
      C &
      DC &
      O &
      DO);
