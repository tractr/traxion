/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseField,
  Constraints,
  ExtractField,
  GetConstraints,
  GetField,
  GetType,
  KeyType,
} from '../base-types';
import { Field } from '../field';
import { CreateFieldOptions } from '../helpers';

/**
 * Factory to create a field
 * @param type
 * @param defaultConstraints
 * @param defaultOptions
 * @returns
 */
// export const createFieldFactory =
//   <
//     T extends string,
//     F extends BaseField = ExtractField<Field, T>,
//     DC extends Constraints<KeyType, any> = Omit<<F>,
//     DO extends CreateFieldOptions<F> = CreateFieldOptions<F>,
//   >(
//     type: T,
//     defaultConstraints: DC,
//     defaultOptions: DO = {} as DO,
//   ) =>
//   <
//     C extends Constraints<KeyType, any> = GetConstraints<F>,
//     O extends CreateFieldOptions<F> = CreateFieldOptions<F>,
//   >(
//     name: string,
//     constraints?: C,
//     options: O = {} as O,
//   ) =>
//     // createField(field, name, { ...defaultConstraints, ...constraints }, { ...defaultOptions, ...options }})
//     ({
//       type,
//       name,
//       ...defaultConstraints,
//       ...constraints,
//       ...defaultOptions,
//       ...options,
//     } as unknown as GetField<F, T> & C & O & DC & DO);
