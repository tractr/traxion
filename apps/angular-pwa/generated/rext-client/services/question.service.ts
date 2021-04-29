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

import { Question } from '@generated/models';
import {
  QuestionCountQueryDto,
  QuestionCreateBodyDto,
  QuestionDeleteParamsDto,
  QuestionFindManyQueryDto,
  QuestionFindUniqueParamsDto,
  QuestionFindUniqueQueryDto,
  QuestionUpdateBodyDto,
  QuestionUpdateParamsDto,
  QuestionUpsertBodyDto,
  QuestionUpsertParamsDto,
} from '@generated/rest-dtos';

export class QuestionService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL('question', apiUrl.toString());
  }

  /**
   * Create a new Question
   *
   * @param createBody - Dto of the request body
   * @param options - Ajax request options
   * @returns a new Question
   */
  public create$(
    createBody: QuestionCreateBodyDto,
    options?: CreateAjaxOptions,
  ): Observable<Question> {
    return fromDto(createBody, QuestionCreateBodyDto).pipe(
      switchMap((body) =>
        create(this.apiUrl, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Question),
        ),
      ),
    );
  }

  /**
   * Create a new Question
   *
   * @param options - Ajax request options
   * @returns a new Question
   */
  public create(
    options?: CreateAjaxOptions,
  ): OperatorFunction<QuestionCreateBodyDto, Question> {
    return switchMap((createBody) => this.create$(createBody, options));
  }

  /**
   * Count the number of Question entities that matches the filter
   *
   * @param countQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns the number of Question
   */
  public count$(
    countQuery?: QuestionCountQueryDto,
    options?: CountAjaxOptions,
  ): Observable<number> {
    return fromDto(countQuery, QuestionCountQueryDto).pipe(
      switchMap((query) =>
        count(this.apiUrl, { ...query }, options).pipe(
          extractAjaxResponseData(),
        ),
      ),
    );
  }

  /**
   * Count the number of Question entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Question
   */
  public count(
    options?: CountAjaxOptions,
  ): OperatorFunction<QuestionCountQueryDto | undefined, number> {
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
    findUniqueParams: QuestionFindUniqueParamsDto,
    findUniqueQuery?: QuestionFindUniqueQueryDto,
    options?: FindUniqueOptions,
  ): Observable<Question> {
    return zip(
      fromDto(findUniqueParams, QuestionFindUniqueParamsDto),
      fromDto(findUniqueQuery, QuestionFindUniqueQueryDto),
    ).pipe(
      switchMap(([params, query]) =>
        findUnique(this.apiUrl, params, { ...query }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Question),
        ),
      ),
    );
  }

  /**
   * Count the number of Question entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Question
   */
  public findUnique(
    options?: FindUniqueOptions,
  ): OperatorFunction<
    | { params: QuestionFindUniqueParamsDto; query?: QuestionFindUniqueQueryDto }
    | [QuestionFindUniqueParamsDto, QuestionFindUniqueQueryDto]
    | QuestionFindUniqueParamsDto,
    Question
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.findUnique$(source[0], source[1], options);
      if (isAlike(source, QuestionFindUniqueParamsDto))
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
    findManyQuery?: QuestionFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<Question[]> {
    return fromDto(findManyQuery, QuestionFindManyQueryDto).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Question),
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
  ): OperatorFunction<QuestionFindManyQueryDto | undefined, Question[]> {
    return switchMap((findManyQuery) => this.findMany$(findManyQuery, options));
  }

  /**
   * Update one Question
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Question
   */
  public patch$(
    updateParams: QuestionUpdateParamsDto,
    updateBody: QuestionUpdateBodyDto,
    options?: PatchOptions,
  ): Observable<Question> {
    return zip(
      fromDto(updateParams, QuestionUpdateParamsDto),
      fromDto(updateBody, QuestionUpdateBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        patch(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Question),
        ),
      ),
    );
  }

  /**
   * patch$ alias
   */
  public update$ = this.patch$.bind(this);

  /**
   * Update one Question
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Question
   */
  public patch(
    options?: PatchOptions,
  ): OperatorFunction<
    | { params: QuestionUpdateParamsDto; body: QuestionUpdateBodyDto }
    | [QuestionUpdateParamsDto, QuestionUpdateBodyDto],
    Question
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
   * Update one Question
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Question
   */
  public upsert$(
    updateParams: QuestionUpsertParamsDto,
    updateBody: QuestionUpsertBodyDto,
    options?: UpsertOptions,
  ): Observable<Question> {
    return zip(
      fromDto(updateParams, QuestionUpsertParamsDto),
      fromDto(updateBody, QuestionUpsertBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        upsert(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Question),
        ),
      ),
    );
  }

  /**
   * Update one Question
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Question
   */
  public upsert(
    options?: UpsertOptions,
  ): OperatorFunction<
    | { params: QuestionUpsertParamsDto; body: QuestionUpsertBodyDto }
    | [QuestionUpsertParamsDto, QuestionUpsertBodyDto],
    Question
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.upsert$(source[0], source[1], options);
      return this.upsert$(source.params, source.body, options);
    });
  }

  /**
   * Delete one Question
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Question
   */
  public remove$(
    deleteParams: QuestionDeleteParamsDto,
    options?: RemoveOptions,
  ): Observable<Question> {
    return fromDto(deleteParams, QuestionDeleteParamsDto).pipe(
      switchMap((params) =>
        remove(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Question),
        ),
      ),
    );
  }

  /**
   * remove$ alias
   */
  public delete$ = this.remove$.bind(this);

  /**
   * Delete one Question
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Question
   */
  public remove(
    options?: RemoveOptions,
  ): OperatorFunction<QuestionDeleteParamsDto, Question> {
    return switchMap((removeParams) => this.remove$(removeParams, options));
  }

  /**
   * remove alias
   */
  public delete = this.remove.bind(this);
}

