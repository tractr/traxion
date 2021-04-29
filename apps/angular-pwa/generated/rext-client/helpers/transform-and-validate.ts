import "reflect-metadata";

import {
  ClassConstructor,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';
import { validateSync, ValidatorOptions } from 'class-validator';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  ) as Required<T>;
}

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

export function transformAndValidate<T>(
  classValidator: ClassConstructor<T>,
  options?: TransformAndValidateOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <O>(value: O) => O extends any[] ? T[] : T {
  return (value: unknown) => {
    const validatedConfig = plainToClass(classValidator, value, {
      enableImplicitConversion: true,
      ...(options?.plainToClass || {}),
    });
    // eslint-disable-next-line @typescript-eslint/ban-types
    const errors = validateSync((validatedConfig as unknown) as object, {
      ...(options?.plainToClass || {}),
    });
    if (errors.length > 0) {
      throw errors;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return validatedConfig as any;
  };
}

export function transformAndValidateMap<O, T>(
  classValidator: ClassConstructor<T>,
  options: TransformAndValidateOptions = {},
) {
  return map((value: O) =>
    transformAndValidate(classValidator, options)(value),
  );
}

export function isAlike<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
  classValidator: ClassConstructor<T>,
  options: {
    plainToClass?: ClassTransformOptions;
  } = {},
): object is T {
  if (object instanceof classValidator) return true;
  try {
    transformAndValidate(classValidator, options)(object);
    return true;
  } catch {
    return false;
  }
}

export function fromDto<T>(
  params: unknown,
  classValidator: ClassConstructor<T>,
  options: {
    plainToClass?: ClassTransformOptions;
  } = {},
) {
  return of(params).pipe(
    defaultsPropertiesMap(classValidator, options),
    transformAndValidateMap(classValidator, options),
  );
}

