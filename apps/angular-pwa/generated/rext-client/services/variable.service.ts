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

import { Variable } from '@generated/models';
import {
  VariableCountQueryDto,
  VariableCreateBodyDto,
  VariableDeleteParamsDto,
  VariableFindManyQueryDto,
  VariableFindUniqueParamsDto,
  VariableFindUniqueQueryDto,
  VariableUpdateBodyDto,
  VariableUpdateParamsDto,
  VariableUpsertBodyDto,
  VariableUpsertParamsDto,
} from '@generated/rest-dtos';

export class VariableService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL('variable', apiUrl.toString());
  }

  /**
   * Create a new Variable
   *
   * @param createBody - Dto of the request body
   * @param options - Ajax request options
   * @returns a new Variable
   */
  public create$(
    createBody: VariableCreateBodyDto,
    options?: CreateAjaxOptions,
  ): Observable<Variable> {
    return fromDto(createBody, VariableCreateBodyDto).pipe(
      switchMap((body) =>
        create(this.apiUrl, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Variable),
        ),
      ),
    );
  }

  /**
   * Create a new Variable
   *
   * @param options - Ajax request options
   * @returns a new Variable
   */
  public create(
    options?: CreateAjaxOptions,
  ): OperatorFunction<VariableCreateBodyDto, Variable> {
    return switchMap((createBody) => this.create$(createBody, options));
  }

  /**
   * Count the number of Variable entities that matches the filter
   *
   * @param countQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns the number of Variable
   */
  public count$(
    countQuery?: VariableCountQueryDto,
    options?: CountAjaxOptions,
  ): Observable<number> {
    return fromDto(countQuery, VariableCountQueryDto).pipe(
      switchMap((query) =>
        count(this.apiUrl, { ...query }, options).pipe(
          extractAjaxResponseData(),
        ),
      ),
    );
  }

  /**
   * Count the number of Variable entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Variable
   */
  public count(
    options?: CountAjaxOptions,
  ): OperatorFunction<VariableCountQueryDto | undefined, number> {
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
    findUniqueParams: VariableFindUniqueParamsDto,
    findUniqueQuery?: VariableFindUniqueQueryDto,
    options?: FindUniqueOptions,
  ): Observable<Variable> {
    return zip(
      fromDto(findUniqueParams, VariableFindUniqueParamsDto),
      fromDto(findUniqueQuery, VariableFindUniqueQueryDto),
    ).pipe(
      switchMap(([params, query]) =>
        findUnique(this.apiUrl, params, { ...query }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Variable),
        ),
      ),
    );
  }

  /**
   * Count the number of Variable entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Variable
   */
  public findUnique(
    options?: FindUniqueOptions,
  ): OperatorFunction<
    | { params: VariableFindUniqueParamsDto; query?: VariableFindUniqueQueryDto }
    | [VariableFindUniqueParamsDto, VariableFindUniqueQueryDto]
    | VariableFindUniqueParamsDto,
    Variable
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.findUnique$(source[0], source[1], options);
      if (isAlike(source, VariableFindUniqueParamsDto))
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
    findManyQuery?: VariableFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<Variable[]> {
    return fromDto(findManyQuery, VariableFindManyQueryDto).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Variable),
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
  ): OperatorFunction<VariableFindManyQueryDto | undefined, Variable[]> {
    return switchMap((findManyQuery) => this.findMany$(findManyQuery, options));
  }

  /**
   * Update one Variable
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Variable
   */
  public patch$(
    updateParams: VariableUpdateParamsDto,
    updateBody: VariableUpdateBodyDto,
    options?: PatchOptions,
  ): Observable<Variable> {
    return zip(
      fromDto(updateParams, VariableUpdateParamsDto),
      fromDto(updateBody, VariableUpdateBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        patch(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Variable),
        ),
      ),
    );
  }

  /**
   * patch$ alias
   */
  public update$ = this.patch$.bind(this);

  /**
   * Update one Variable
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Variable
   */
  public patch(
    options?: PatchOptions,
  ): OperatorFunction<
    | { params: VariableUpdateParamsDto; body: VariableUpdateBodyDto }
    | [VariableUpdateParamsDto, VariableUpdateBodyDto],
    Variable
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
   * Update one Variable
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Variable
   */
  public upsert$(
    updateParams: VariableUpsertParamsDto,
    updateBody: VariableUpsertBodyDto,
    options?: UpsertOptions,
  ): Observable<Variable> {
    return zip(
      fromDto(updateParams, VariableUpsertParamsDto),
      fromDto(updateBody, VariableUpsertBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        upsert(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Variable),
        ),
      ),
    );
  }

  /**
   * Update one Variable
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Variable
   */
  public upsert(
    options?: UpsertOptions,
  ): OperatorFunction<
    | { params: VariableUpsertParamsDto; body: VariableUpsertBodyDto }
    | [VariableUpsertParamsDto, VariableUpsertBodyDto],
    Variable
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.upsert$(source[0], source[1], options);
      return this.upsert$(source.params, source.body, options);
    });
  }

  /**
   * Delete one Variable
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Variable
   */
  public remove$(
    deleteParams: VariableDeleteParamsDto,
    options?: RemoveOptions,
  ): Observable<Variable> {
    return fromDto(deleteParams, VariableDeleteParamsDto).pipe(
      switchMap((params) =>
        remove(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Variable),
        ),
      ),
    );
  }

  /**
   * remove$ alias
   */
  public delete$ = this.remove$.bind(this);

  /**
   * Delete one Variable
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Variable
   */
  public remove(
    options?: RemoveOptions,
  ): OperatorFunction<VariableDeleteParamsDto, Variable> {
    return switchMap((removeParams) => this.remove$(removeParams, options));
  }

  /**
   * remove alias
   */
  public delete = this.remove.bind(this);
}

