import { Observable, OperatorFunction, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  count,
  CountAjaxOptions,
  create,
  CreateAjaxOptions,
  extractAjaxResponseData,
  findMany,
  FindManyOptions,
  findUnique,
  FindUniqueOptions,
  fromDto,
  isAlike,
  patch,
  PatchOptions,
  remove,
  RemoveOptions,
  transformAndValidateMap,
  upsert,
  UpsertOptions,
} from '../helpers';

import { Tag } from '@generated/models';
import {
  TagCountQueryDto,
  TagCreateBodyDto,
  TagDeleteParamsDto,
  TagFindManyQueryDto,
  TagFindUniqueParamsDto,
  TagFindUniqueQueryDto,
  TagUpdateBodyDto,
  TagUpdateParamsDto,
  TagUpsertBodyDto,
  TagUpsertParamsDto,
} from '@generated/rest-dtos';

export class TagService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL('tag', apiUrl.toString());
  }

  /**
   * Create a new Tag
   *
   * @param createBody - Dto of the request body
   * @param options - Ajax request options
   * @returns a new Tag
   */
  public create$(
    createBody: TagCreateBodyDto,
    options?: CreateAjaxOptions,
  ): Observable<Tag> {
    return fromDto(createBody, TagCreateBodyDto).pipe(
      switchMap((body) =>
        create(this.apiUrl, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Tag),
        ),
      ),
    );
  }

  /**
   * Create a new Tag
   *
   * @param options - Ajax request options
   * @returns a new Tag
   */
  public create(
    options?: CreateAjaxOptions,
  ): OperatorFunction<TagCreateBodyDto, Tag> {
    return switchMap((createBody) => this.create$(createBody, options));
  }

  /**
   * Count the number of Tag entities that matches the filter
   *
   * @param countQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns the number of Tag
   */
  public count$(
    countQuery?: TagCountQueryDto,
    options?: CountAjaxOptions,
  ): Observable<number> {
    return fromDto(countQuery, TagCountQueryDto).pipe(
      switchMap((query) =>
        count(this.apiUrl, { ...query }, options).pipe(
          extractAjaxResponseData(),
        ),
      ),
    );
  }

  /**
   * Count the number of Tag entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Tag
   */
  public count(
    options?: CountAjaxOptions,
  ): OperatorFunction<TagCountQueryDto | undefined, number> {
    return switchMap((countQuery) => this.count$(countQuery, options));
  }

  /**
   * Find zero or one Model that matches the filter
   *
   model
   * @param findUniqueParams - Dto of the request param
   * @param findUniqueQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns a Model or null
   */
  public findUnique$(
    findUniqueParams: TagFindUniqueParamsDto,
    findUniqueQuery?: TagFindUniqueQueryDto,
    options?: FindUniqueOptions,
  ): Observable<Tag> {
    return zip(
      fromDto(findUniqueParams, TagFindUniqueParamsDto),
      fromDto(findUniqueQuery, TagFindUniqueQueryDto),
    ).pipe(
      switchMap(([params, query]) =>
        findUnique(this.apiUrl, params, { ...query }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Tag),
        ),
      ),
    );
  }

  /**
   * Count the number of Tag entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Tag
   */
  public findUnique(
    options?: FindUniqueOptions,
  ): OperatorFunction<
    | { params: TagFindUniqueParamsDto; query?: TagFindUniqueQueryDto }
    | [TagFindUniqueParamsDto, TagFindUniqueQueryDto]
    | TagFindUniqueParamsDto,
    Tag
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.findUnique$(source[0], source[1], options);
      if (isAlike(source, TagFindUniqueParamsDto))
        return this.findUnique$(source, undefined, options);
      return this.findUnique$(source.params, source.query, options);
    });
  }

  /**
   * Find zero or more Model entities that matches the filter
   *
   * @param findManyQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns an array of Model entities
   */
  public findMany$(
    findManyQuery?: TagFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<Tag[]> {
    return fromDto(findManyQuery, TagFindManyQueryDto).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Tag),
        ),
      ),
    );
  }

  /**
   * Find zero or more Model entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns an array of Model entities
   */
  public findMany(
    options?: FindManyOptions,
  ): OperatorFunction<TagFindManyQueryDto | undefined, Tag[]> {
    return switchMap((findManyQuery) => this.findMany$(findManyQuery, options));
  }

  /**
   * Update one Tag
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Tag
   */
  public patch$(
    updateParams: TagUpdateParamsDto,
    updateBody: TagUpdateBodyDto,
    options?: PatchOptions,
  ): Observable<Tag> {
    return zip(
      fromDto(updateParams, TagUpdateParamsDto),
      fromDto(updateBody, TagUpdateBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        patch(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Tag),
        ),
      ),
    );
  }

  /**
   * patch$ alias
   */
  public update$ = this.patch$.bind(this);

  /**
   * Update one Tag
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Tag
   */
  public patch(
    options?: PatchOptions,
  ): OperatorFunction<
    | { params: TagUpdateParamsDto; body: TagUpdateBodyDto }
    | [TagUpdateParamsDto, TagUpdateBodyDto],
    Tag
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.patch$(source[0], source[1], options);
      return this.patch$(source.params, source.body, options);
    });
  }

  /**
   * patch alias
   */
  public update = this.patch.bind(this);

  /**
   * Update one Tag
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Tag
   */
  public upsert$(
    updateParams: TagUpsertParamsDto,
    updateBody: TagUpsertBodyDto,
    options?: UpsertOptions,
  ): Observable<Tag> {
    return zip(
      fromDto(updateParams, TagUpsertParamsDto),
      fromDto(updateBody, TagUpsertBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        upsert(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Tag),
        ),
      ),
    );
  }

  /**
   * Update one Tag
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Tag
   */
  public upsert(
    options?: UpsertOptions,
  ): OperatorFunction<
    | { params: TagUpsertParamsDto; body: TagUpsertBodyDto }
    | [TagUpsertParamsDto, TagUpsertBodyDto],
    Tag
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.upsert$(source[0], source[1], options);
      return this.upsert$(source.params, source.body, options);
    });
  }

  /**
   * Delete one Tag
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Tag
   */
  public remove$(
    deleteParams: TagDeleteParamsDto,
    options?: RemoveOptions,
  ): Observable<Tag> {
    return fromDto(deleteParams, TagDeleteParamsDto).pipe(
      switchMap((params) =>
        remove(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Tag),
        ),
      ),
    );
  }

  /**
   * remove$ alias
   */
  public delete$ = this.remove$.bind(this);

  /**
   * Delete one Tag
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Tag
   */
  public remove(
    options?: RemoveOptions,
  ): OperatorFunction<TagDeleteParamsDto, Tag> {
    return switchMap((removeParams) => this.remove$(removeParams, options));
  }

  /**
   * remove alias
   */
  public delete = this.remove.bind(this);
}

