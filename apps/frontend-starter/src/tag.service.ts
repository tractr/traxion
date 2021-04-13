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
import { zip } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { Tag } from '../generated/models';
import {
  TagFindManyQueryDto,
  TagFindUniqueParamsDto,
  TagFindUniqueQueryDto,
} from '../generated/rest-dtos';
import {
  extractAjaxResponseData,
  findMany,
  findUnique,
  fromParams,
  transformAndValidateMap,
} from './common.crud';

export class TagService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL(`${apiUrl.toString()}/tag`);
  }

  findUnique(
    searchParams: TagFindUniqueParamsDto,
    searchQuery: TagFindUniqueQueryDto = {},
  ) {
    return zip(
      fromParams(searchParams, TagFindUniqueParamsDto),
      fromParams(searchQuery, TagFindUniqueQueryDto),
    ).pipe(
      concatMap(([params, query]) => findUnique(this.apiUrl, params, query)),
      extractAjaxResponseData(),
      transformAndValidateMap(Tag),
    );
  }

  findMany(searchParams?: TagFindManyQueryDto) {
    return fromParams(searchParams, TagFindUniqueParamsDto).pipe(
      concatMap((params) => findMany(this.apiUrl, params)),
      extractAjaxResponseData(),
      transformAndValidateMap(Tag),
    );
  }
}
