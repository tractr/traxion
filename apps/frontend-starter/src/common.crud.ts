import 'reflect-metadata';

import {
  ClassConstructor,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';
import { validateSync, ValidatorOptions } from 'class-validator';
import { Observable, of } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import { Tag } from '../generated/models';
import { ajax } from './rxjs-ajax.helper';

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

export function getUrl(
  apiUrl: string | URL,
  params:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined,
): URL {
  const url = new URL(apiUrl.toString());
  const queries = new URLSearchParams(params);

  url.search = queries.toString();

  return url;
}

export function fromParams<T>(
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

export function extractAjaxResponseData<T extends [U, AjaxResponse], U>() {
  return map<T, U>((data) => data[0]);
}

/**
 * Search results for the given search params
 */
export function findUnique<
  FindUniqueQueryDto extends { id: string | number },
  T
>(
  apiUrl: string | URL,
  searchParams: FindUniqueQueryDto,
  searchQuery: T,
): Observable<[unknown, AjaxResponse]> {
  const url = getUrl(
    `${apiUrl.toString()}/${searchParams.id}`,
    searchQuery as any,
  );

  return ajax({
    url: url.toString(),
    method: 'GET',
    headers: {
      withCredentials: true,
    },
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}
/**
 * Search results for the given search params
 */
export function findMany<T>(
  apiUrl: string | URL,
  searchParams: T,
): Observable<[unknown[], AjaxResponse]> {
  const url = getUrl(apiUrl.toString(), searchParams as any);
  return ajax({
    url: url.toString(),
    method: 'GET',
    headers: {
      withCredentials: true,
    },
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}
