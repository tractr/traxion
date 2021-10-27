import 'reflect-metadata';

import {
  ClassConstructor,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';
import {
  validateSync,
  ValidationError,
  ValidatorOptions,
} from 'class-validator';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransformAndValidateError } from '../interfaces';

/**
 * Tage a class with  validator and transform decorator and return all
 * the default field
 *
 * @param classValidator
 * @param options
 * @returns an instance of the class with the default fields
 */
export function getDefaults<T>(
  classValidator: ClassConstructor<T>,
  options: {
    plainToClass?: ClassTransformOptions;
  } = {},
): Required<T> {
  return plainToClass(
    classValidator,
    {},
    {
      enableImplicitConversion: true,
      ...(options?.plainToClass || {}),
    },
  ) as unknown as Required<T>;
}

/**
 * Create a map operator to get a default instance of a class validator
 * @param classValidator
 * @param options
 * @returns a instance of a class validator
 */
export function defaultsPropertiesMap<T>(
  classValidator: ClassConstructor<T>,
  options: {
    plainToClass?: ClassTransformOptions;
  } = {},
) {
  return map((value: unknown) => {
    const defaultOptions = getDefaults(classValidator, options);
    return {
      ...defaultOptions,
      ...((value || {}) as Record<string, unknown>),
    };
  });
}

export interface TransformAndValidateOptions {
  plainToClass?: ClassTransformOptions;
  validate?: ValidatorOptions;
}

export type TransformAndValidate<T> = <O>(
  value: O,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => O extends any[] ? T[] : T;

/**
 * Take ValidateError array and format Error.message to get a pretty
 * and understandable error
 * @param error the ValidationError list
 * @returns a TransformAndValidateError Error
 */
export function formatTransformAndValidateErrorMessage(
  errors: ValidationError[],
): TransformAndValidateError {
  const errorMessage = `An error occur during the object validation:\n
  ${errors
    .map(
      ({ property, value, constraints }) =>
        `Property ${property} (value: ${value}): \n${Object.keys(
          constraints || {},
        )
          .map((constraintKey) => `  - ${(constraints || {})[constraintKey]}`)
          .join('\n')}\n\n`,
    )
    .join('\n')}`;

  const errorToThrow = new Error(errorMessage);
  (errorToThrow as TransformAndValidateError).originalErrors = errors;
  return errorToThrow as TransformAndValidateError;
}

/**
 * Take a class with validator and transform decorator and return a
 * function that take an unknown value and transform and validate it
 * to return an instance of the class
 *
 * @param classValidator
 * @param options - Options for plainToClass transformation and validation.
 * Default for plain to class transformation: exposeDefaultValues: true and
 * enableImplicitConvetsion: false
 * @returns a validate and transform function for the class validator
 */
export function transformAndValidate<T>(
  classValidator: ClassConstructor<T>,
  options?: TransformAndValidateOptions,
): TransformAndValidate<T> {
  return (value: unknown) => {
    const validatedConfig = plainToClass(classValidator, value, {
      exposeDefaultValues: true,
      enableImplicitConversion: false,
      ...(options?.plainToClass || {}),
    });
    // eslint-disable-next-line @typescript-eslint/ban-types
    const errors = validateSync(validatedConfig as unknown as object, {
      ...(options?.validate || {}),
    });
    if (errors.length > 0) {
      throw formatTransformAndValidateErrorMessage(errors);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return validatedConfig as any;
  };
}

/**
 * Take a class with validator and transform decorator and return a
 * function that take an unknown value and transform and validate it
 * to return an instance of the class
 * @param classValidator
 * @param options
 * @returns a validate and transform function for the class validator
 */
export function transformAndValidateMap<O, T>(
  classValidator: ClassConstructor<T>,
  options: TransformAndValidateOptions = {},
) {
  return map((value: O) =>
    transformAndValidate(classValidator, options)(value),
  );
}

/**
 * isAlike return a boolean based on the validation of an object against
 * a class validator
 *
 * @param object
 * @param classValidator
 * @param options
 * @returns true or false in function of the success and assert that the
 * object is typeof the class
 */
export function isAlike<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
  classValidator: ClassConstructor<T>,
  options: TransformAndValidateOptions = {},
): object is T {
  if (object instanceof classValidator) return true;

  try {
    transformAndValidate(classValidator, options)(object);
    return true;
  } catch {
    return false;
  }
}

/**
 * fromDto is a rxjs source that take an unknown value, validate and transform
 * it against a class validator and its default value and return it to the stream
 * @param params
 * @param classValidator
 * @param options
 * @returns a stream of a validate instance of a class validator
 */
export function fromDto<T>(
  params: unknown,
  classValidator: ClassConstructor<T>,
  options: TransformAndValidateOptions = {},
) {
  return of(params).pipe(
    defaultsPropertiesMap(
      classValidator,
      options.plainToClass ? { plainToClass: options.plainToClass } : {},
    ),
    transformAndValidateMap(classValidator, options),
  );
}
