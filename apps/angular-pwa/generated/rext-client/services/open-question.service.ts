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

import { OpenQuestion } from '@generated/models';
import {
  OpenQuestionCountQueryDto,
  OpenQuestionCreateBodyDto,
  OpenQuestionDeleteParamsDto,
  OpenQuestionFindManyQueryDto,
  OpenQuestionFindUniqueParamsDto,
  OpenQuestionFindUniqueQueryDto,
  OpenQuestionUpdateBodyDto,
  OpenQuestionUpdateParamsDto,
  OpenQuestionUpsertBodyDto,
  OpenQuestionUpsertParamsDto,
} from '@generated/rest-dtos';

export class OpenQuestionService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL('open-question', apiUrl.toString());
  }

  /**
   * Create a new OpenQuestion
   *
   * @param createBody - Dto of the request body
   * @param options - Ajax request options
   * @returns a new OpenQuestion
   */
  public create$(
    createBody: OpenQuestionCreateBodyDto,
    options?: CreateAjaxOptions,
  ): Observable<OpenQuestion> {
    return fromDto(createBody, OpenQuestionCreateBodyDto).pipe(
      switchMap((body) =>
        create(this.apiUrl, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(OpenQuestion),
        ),
      ),
    );
  }

  /**
   * Create a new OpenQuestion
   *
   * @param options - Ajax request options
   * @returns a new OpenQuestion
   */
  public create(
    options?: CreateAjaxOptions,
  ): OperatorFunction<OpenQuestionCreateBodyDto, OpenQuestion> {
    return switchMap((createBody) => this.create$(createBody, options));
  }

  /**
   * Count the number of OpenQuestion entities that matches the filter
   *
   * @param countQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns the number of OpenQuestion
   */
  public count$(
    countQuery?: OpenQuestionCountQueryDto,
    options?: CountAjaxOptions,
  ): Observable<number> {
    return fromDto(countQuery, OpenQuestionCountQueryDto).pipe(
      switchMap((query) =>
        count(this.apiUrl, { ...query }, options).pipe(
          extractAjaxResponseData(),
        ),
      ),
    );
  }

  /**
   * Count the number of OpenQuestion entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of OpenQuestion
   */
  public count(
    options?: CountAjaxOptions,
  ): OperatorFunction<OpenQuestionCountQueryDto | undefined, number> {
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
    findUniqueParams: OpenQuestionFindUniqueParamsDto,
    findUniqueQuery?: OpenQuestionFindUniqueQueryDto,
    options?: FindUniqueOptions,
  ): Observable<OpenQuestion> {
    return zip(
      fromDto(findUniqueParams, OpenQuestionFindUniqueParamsDto),
      fromDto(findUniqueQuery, OpenQuestionFindUniqueQueryDto),
    ).pipe(
      switchMap(([params, query]) =>
        findUnique(this.apiUrl, params, { ...query }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(OpenQuestion),
        ),
      ),
    );
  }

  /**
   * Count the number of OpenQuestion entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of OpenQuestion
   */
  public findUnique(
    options?: FindUniqueOptions,
  ): OperatorFunction<
    | { params: OpenQuestionFindUniqueParamsDto; query?: OpenQuestionFindUniqueQueryDto }
    | [OpenQuestionFindUniqueParamsDto, OpenQuestionFindUniqueQueryDto]
    | OpenQuestionFindUniqueParamsDto,
    OpenQuestion
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.findUnique$(source[0], source[1], options);
      if (isAlike(source, OpenQuestionFindUniqueParamsDto))
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
    findManyQuery?: OpenQuestionFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<OpenQuestion[]> {
    return fromDto(findManyQuery, OpenQuestionFindManyQueryDto).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(OpenQuestion),
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
  ): OperatorFunction<OpenQuestionFindManyQueryDto | undefined, OpenQuestion[]> {
    return switchMap((findManyQuery) => this.findMany$(findManyQuery, options));
  }

  /**
   * Update one OpenQuestion
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated OpenQuestion
   */
  public patch$(
    updateParams: OpenQuestionUpdateParamsDto,
    updateBody: OpenQuestionUpdateBodyDto,
    options?: PatchOptions,
  ): Observable<OpenQuestion> {
    return zip(
      fromDto(updateParams, OpenQuestionUpdateParamsDto),
      fromDto(updateBody, OpenQuestionUpdateBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        patch(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(OpenQuestion),
        ),
      ),
    );
  }

  /**
   * patch$ alias
   */
  public update$ = this.patch$.bind(this);

  /**
   * Update one OpenQuestion
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated OpenQuestion
   */
  public patch(
    options?: PatchOptions,
  ): OperatorFunction<
    | { params: OpenQuestionUpdateParamsDto; body: OpenQuestionUpdateBodyDto }
    | [OpenQuestionUpdateParamsDto, OpenQuestionUpdateBodyDto],
    OpenQuestion
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
   * Update one OpenQuestion
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated OpenQuestion
   */
  public upsert$(
    updateParams: OpenQuestionUpsertParamsDto,
    updateBody: OpenQuestionUpsertBodyDto,
    options?: UpsertOptions,
  ): Observable<OpenQuestion> {
    return zip(
      fromDto(updateParams, OpenQuestionUpsertParamsDto),
      fromDto(updateBody, OpenQuestionUpsertBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        upsert(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(OpenQuestion),
        ),
      ),
    );
  }

  /**
   * Update one OpenQuestion
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated OpenQuestion
   */
  public upsert(
    options?: UpsertOptions,
  ): OperatorFunction<
    | { params: OpenQuestionUpsertParamsDto; body: OpenQuestionUpsertBodyDto }
    | [OpenQuestionUpsertParamsDto, OpenQuestionUpsertBodyDto],
    OpenQuestion
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.upsert$(source[0], source[1], options);
      return this.upsert$(source.params, source.body, options);
    });
  }

  /**
   * Delete one OpenQuestion
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated OpenQuestion
   */
  public remove$(
    deleteParams: OpenQuestionDeleteParamsDto,
    options?: RemoveOptions,
  ): Observable<OpenQuestion> {
    return fromDto(deleteParams, OpenQuestionDeleteParamsDto).pipe(
      switchMap((params) =>
        remove(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(OpenQuestion),
        ),
      ),
    );
  }

  /**
   * remove$ alias
   */
  public delete$ = this.remove$.bind(this);

  /**
   * Delete one OpenQuestion
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated OpenQuestion
   */
  public remove(
    options?: RemoveOptions,
  ): OperatorFunction<OpenQuestionDeleteParamsDto, OpenQuestion> {
    return switchMap((removeParams) => this.remove$(removeParams, options));
  }

  /**
   * remove alias
   */
  public delete = this.remove.bind(this);
}

