/**
 *
 * Tout ceci a été codé à l'aveugle, il est possible que cela ne fonctione pas du tout ahahah c'est cadeau pépito.
 *
 */


/**
 * This service is a first iteration of the reXt-client
 * We will write for now a simulation of the generate service for a specific model.
 * The model we're gonna use is User, generated in the backend-starter's app.
 */

import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Tag, TagInclude } from '@generated/models';
import { TagCreateBodyDto, TagFindManyQueryDto } from '@generated/rest-dtos';
import { map, tap } from 'rxjs/operators';

/**
 * Create a tag
 */
export function post(
  apiUrl: string,
  body: TagCreateBodyDto,
): Observable<AjaxResponse> {
  return ajax({
    url: apiUrl,
    method: 'POST',
    headers: {
      withCredentials: true,
    },
    body,
  })
}

/**
 * Patch a tag
 */
export function patch(
  apiUrl: string,
  id: string,
  tagCreateBodyDto: TagCreateBodyDto,
): Observable<AjaxResponse> {
  return ajax({
    url: `${apiUrl}/${id}`,
    method: 'PATCH',
    headers: {
      withCredentials: true,
    },
    body: tagCreateBodyDto,
  });
}

/**
 * Post or patch a tag
 */
export function put(
  apiUrl: string,
  id: string,
  tagCreateBodyDto: TagCreateBodyDto,
): Observable<AjaxResponse> {
  return ajax({
    url: `${apiUrl}/${id}`,
    method: 'PUT',
    headers: {
      withCredentials: true,
    },
    body: tagCreateBodyDto,
  });
}

/**
 * Remove a tag
 */
export function remove(apiUrl: string, id: string): Observable<AjaxResponse> {
  return ajax({
    url: `${apiUrl}/${id}`,
    method: 'DELETE',
    headers: {
      withCredentials: true,
    },
  });
}

/**
 * Get a tag by id
 * Can take populate params
 */
export function getUnique(
  apiUrl: string,
  id: string,
  populateParams: TagInclude[] = [],
): Observable<AjaxResponse> {
  return ajax({
    url: `${apiUrl}/${id}`,
    method: 'GET',
    headers: {
      withCredentials: true,
      params: populateParams, // Todo: Do we need to transform that array into a params string ?
    },
  });
}

/**
 * Search results for the given search params
 */
export function search(
  apiUrl: string,
  searchParams: TagFindManyQueryDto,
): Observable<AjaxResponse> {
  return ajax({
    url: `${apiUrl}`,
    method: 'GET',
    headers: {
      withCredentials: true,
      params: searchParams, // Todo: How to include populate params ?
    },
  });
  // Todo: Should we sort the api response and transforms the data into new instance of Tag ?
  // .pipe(
  //   map(ajaxResponse => ({
  //     page: ajaxResponse.response.page,
  //     limit: ajaxResponse.response.limit,
  //     count: ajaxResponse.response.count,
  //     total: ajaxResponse.response.total,
  //     items: ajaxResponse.response.items.map((item): TagFindManyQueryDto => new Tag(item)),
  //   }))
  // )
}

/**
 * Count results for the given search params
 */
export function count(
  apiUrl: string,
  searchParams: TagFindManyQueryDto,
): Observable<AjaxResponse> {
  return ajax({
    url: `${apiUrl}/count`,
    method: 'GET',
    headers: {
      withCredentials: true,
      params: searchParams,
    },
  });
}
