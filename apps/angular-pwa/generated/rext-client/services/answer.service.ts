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

import { Answer } from '@generated/models';
import {
  AnswerCountQueryDto,
  AnswerCreateBodyDto,
  AnswerDeleteParamsDto,
  AnswerFindManyQueryDto,
  AnswerFindUniqueParamsDto,
  AnswerFindUniqueQueryDto,
  AnswerUpdateBodyDto,
  AnswerUpdateParamsDto,
  AnswerUpsertBodyDto,
  AnswerUpsertParamsDto,
} from '@generated/rest-dtos';

export class AnswerService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL('answer', apiUrl.toString());
  }

  /**
   * Create a new Answer
   *
   * @param createBody - Dto of the request body
   * @param options - Ajax request options
   * @returns a new Answer
   */
  public create$(
    createBody: AnswerCreateBodyDto,
    options?: CreateAjaxOptions,
  ): Observable<Answer> {
    return fromDto(createBody, AnswerCreateBodyDto).pipe(
      switchMap((body) =>
        create(this.apiUrl, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Answer),
        ),
      ),
    );
  }

  /**
   * Create a new Answer
   *
   * @param options - Ajax request options
   * @returns a new Answer
   */
  public create(
    options?: CreateAjaxOptions,
  ): OperatorFunction<AnswerCreateBodyDto, Answer> {
    return switchMap((createBody) => this.create$(createBody, options));
  }

  /**
   * Count the number of Answer entities that matches the filter
   *
   * @param countQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns the number of Answer
   */
  public count$(
    countQuery?: AnswerCountQueryDto,
    options?: CountAjaxOptions,
  ): Observable<number> {
    return fromDto(countQuery, AnswerCountQueryDto).pipe(
      switchMap((query) =>
        count(this.apiUrl, { ...query }, options).pipe(
          extractAjaxResponseData(),
        ),
      ),
    );
  }

  /**
   * Count the number of Answer entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Answer
   */
  public count(
    options?: CountAjaxOptions,
  ): OperatorFunction<AnswerCountQueryDto | undefined, number> {
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
    findUniqueParams: AnswerFindUniqueParamsDto,
    findUniqueQuery?: AnswerFindUniqueQueryDto,
    options?: FindUniqueOptions,
  ): Observable<Answer> {
    return zip(
      fromDto(findUniqueParams, AnswerFindUniqueParamsDto),
      fromDto(findUniqueQuery, AnswerFindUniqueQueryDto),
    ).pipe(
      switchMap(([params, query]) =>
        findUnique(this.apiUrl, params, { ...query }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Answer),
        ),
      ),
    );
  }

  /**
   * Count the number of Answer entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Answer
   */
  public findUnique(
    options?: FindUniqueOptions,
  ): OperatorFunction<
    | { params: AnswerFindUniqueParamsDto; query?: AnswerFindUniqueQueryDto }
    | [AnswerFindUniqueParamsDto, AnswerFindUniqueQueryDto]
    | AnswerFindUniqueParamsDto,
    Answer
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.findUnique$(source[0], source[1], options);
      if (isAlike(source, AnswerFindUniqueParamsDto))
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
    findManyQuery?: AnswerFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<Answer[]> {
    return fromDto(findManyQuery, AnswerFindManyQueryDto).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Answer),
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
  ): OperatorFunction<AnswerFindManyQueryDto | undefined, Answer[]> {
    return switchMap((findManyQuery) => this.findMany$(findManyQuery, options));
  }

  /**
   * Update one Answer
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Answer
   */
  public patch$(
    updateParams: AnswerUpdateParamsDto,
    updateBody: AnswerUpdateBodyDto,
    options?: PatchOptions,
  ): Observable<Answer> {
    return zip(
      fromDto(updateParams, AnswerUpdateParamsDto),
      fromDto(updateBody, AnswerUpdateBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        patch(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Answer),
        ),
      ),
    );
  }

  /**
   * patch$ alias
   */
  public update$ = this.patch$.bind(this);

  /**
   * Update one Answer
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Answer
   */
  public patch(
    options?: PatchOptions,
  ): OperatorFunction<
    | { params: AnswerUpdateParamsDto; body: AnswerUpdateBodyDto }
    | [AnswerUpdateParamsDto, AnswerUpdateBodyDto],
    Answer
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
   * Update one Answer
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Answer
   */
  public upsert$(
    updateParams: AnswerUpsertParamsDto,
    updateBody: AnswerUpsertBodyDto,
    options?: UpsertOptions,
  ): Observable<Answer> {
    return zip(
      fromDto(updateParams, AnswerUpsertParamsDto),
      fromDto(updateBody, AnswerUpsertBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        upsert(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Answer),
        ),
      ),
    );
  }

  /**
   * Update one Answer
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Answer
   */
  public upsert(
    options?: UpsertOptions,
  ): OperatorFunction<
    | { params: AnswerUpsertParamsDto; body: AnswerUpsertBodyDto }
    | [AnswerUpsertParamsDto, AnswerUpsertBodyDto],
    Answer
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.upsert$(source[0], source[1], options);
      return this.upsert$(source.params, source.body, options);
    });
  }

  /**
   * Delete one Answer
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Answer
   */
  public remove$(
    deleteParams: AnswerDeleteParamsDto,
    options?: RemoveOptions,
  ): Observable<Answer> {
    return fromDto(deleteParams, AnswerDeleteParamsDto).pipe(
      switchMap((params) =>
        remove(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Answer),
        ),
      ),
    );
  }

  /**
   * remove$ alias
   */
  public delete$ = this.remove$.bind(this);

  /**
   * Delete one Answer
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Answer
   */
  public remove(
    options?: RemoveOptions,
  ): OperatorFunction<AnswerDeleteParamsDto, Answer> {
    return switchMap((removeParams) => this.remove$(removeParams, options));
  }

  /**
   * remove alias
   */
  public delete = this.remove.bind(this);
}

