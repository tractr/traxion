import { Observable, OperatorFunction } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

import { getUrl, URLSearchParamsType } from './url';

export function ajax(options: string | AjaxRequest): Observable<AjaxResponse> {
  return request(typeof options === 'string' ? { url: options } : options);
}

export function extractAjaxResponseData<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends [any, AjaxResponse]
>(): OperatorFunction<T, T extends [infer R, AjaxResponse] ? R : never> {
  return map((data) => data[0]);
}

export type CreateAjaxOptions = Omit<AjaxRequest, 'url' | 'method' | 'body'>;

/**
 * Create a new Model
 *
 * @param apiUrl - The URL endpoint to that model
 * @param createBody - Dto of the request body
 * @param options - Ajax request options
 * @returns a new Model
 */
export function create<T, CreateBody>(
  apiUrl: URL,
  createBody: CreateBody,
  options: CreateAjaxOptions = {},
): Observable<[T, AjaxResponse]> {
  const url = getUrl(apiUrl);
  return ajax({
    url: url.toString(),
    method: 'POST',
    body: createBody,
    withCredentials: true,
    ...options,
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}

export type CountAjaxOptions = Omit<AjaxRequest, 'url' | 'method'>;

/**
 * Count the number of Model entities that matches the filter
 *
 * @param apiUrl - The URL endpoint to that model
 * @param countQuery - Dto of the request query
 * @param options - Ajax request options
 * @returns the number of Model
 */
export function count<CountQuery extends URLSearchParamsType>(
  apiUrl: URL,
  countQuery: CountQuery,
  options: CountAjaxOptions = {},
): Observable<[number, AjaxResponse]> {
  const url = getUrl(apiUrl, '/count', countQuery);
  return ajax({
    url: url.toString(),
    method: 'GET',
    withCredentials: true,
    ...options,
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}

export type FindUniqueOptions = Omit<AjaxRequest, 'url' | 'method'>;

/**
 * Find zero or one Model that matches the filter
 *
 * @param apiUrl - The URL endpoint to that model
 * @param findUniqueParams - Dto of the request param
 * @param findUniqueQuery - Dto of the request query
 * @param options - Ajax request options
 * @returns a Model or null
 */
export function findUnique<
  T,
  FindUniqueParams extends { id: string | number },
  FindUniqueQuery extends URLSearchParamsType
>(
  apiUrl: URL,
  findUniqueParams: FindUniqueParams,
  findUniqueQuery: FindUniqueQuery,
  options: FindUniqueOptions = {},
): Observable<[T, AjaxResponse]> {
  const url = getUrl(apiUrl, `/${findUniqueParams.id}`, findUniqueQuery);
  return ajax({
    url: url.toString(),
    method: 'GET',
    withCredentials: true,
    ...options,
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}

export type FindManyOptions = Omit<AjaxRequest, 'url' | 'method'>;

/**
 * Find zero or more Model entities that matches the filter
 *
 * @param apiUrl - The URL endpoint to that model
 * @param findManyQuery - Dto of the request query
 * @param options - Ajax request options
 * @returns an array of Model entities
 */
export function findMany<T, FindManyQuery extends URLSearchParamsType>(
  apiUrl: URL,
  findManyQuery: FindManyQuery,
  options: FindManyOptions = {},
): Observable<[T[], AjaxResponse]> {
  const url = getUrl(apiUrl, '', findManyQuery);
  return ajax({
    url: url.toString(),
    method: 'GET',
    withCredentials: true,
    ...options,
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}

export type PatchOptions = Omit<AjaxRequest, 'url' | 'method' | 'body'>;

/**
 * Update one Model
 *
 * @Remarks
 *
 * Partial updates are allowed with this method
 *
 * @param apiUrl - The URL endpoint to that model
 * @param updateParams - Dto of the request param
 * @param updateBody - Dto of the request body
 * @param options - Ajax request options
 * @returns the updated Model
 */
export function patch<
  T,
  UpdateParams extends { id: string | number },
  UpdateBody
>(
  apiUrl: URL,
  updateParams: UpdateParams,
  updateBody: UpdateBody,
  options: PatchOptions = {},
): Observable<[T, AjaxResponse]> {
  const url = getUrl(apiUrl, `/${updateParams.id}`);
  return ajax({
    url: url.toString(),
    method: 'PATCH',
    body: updateBody,
    withCredentials: true,
    ...options,
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}

export type UpsertOptions = Omit<AjaxRequest, 'url' | 'method' | 'body'>;

/**
 * Update or create one Model
 *
 * @Remarks
 *
 * Partial updates are forbidden with this method. It will
 * fully replace the matched entity
 *
 * @param apiUrl - Url of the api endpoint
 * @param upsertParams - Dto of the request param
 * @param updateBody - Dto of the request body
 * @param options - Ajax request options
 * @returns the updated Model
 */
export function upsert<
  T,
  UpsertParams extends { id: string | number },
  UpsertBody
>(
  apiUrl: URL,
  upsertParams: UpsertParams,
  upsertBody: UpsertBody,
  options: UpsertOptions = {},
): Observable<[T, AjaxResponse]> {
  const url = getUrl(apiUrl, `/${upsertParams.id}`);
  return ajax({
    url: url.toString(),
    method: 'PUT',
    body: upsertBody,
    withCredentials: true,
    ...options,
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}

export type RemoveOptions = Omit<AjaxRequest, 'url' | 'method'>;

/**
 * Delete one Model
 *
 * @param apiUrl - Url of the api endpoint
 * @param deleteParams - Dto of the request param
 * @param options - Ajax request options
 * @returns the updated Model
 */
export function remove<T, DeleteParams extends { id: string | number }>(
  apiUrl: URL,
  deleteParams: DeleteParams,
  options: RemoveOptions = {},
): Observable<[T, AjaxResponse]> {
  const url = getUrl(apiUrl, `/${deleteParams.id}`);
  return ajax({
    url: url.toString(),
    method: 'DELETE',
    withCredentials: true,
    ...options,
  }).pipe(map((value: AjaxResponse) => [value.response, value]));
}

