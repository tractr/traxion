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

import { User } from '@generated/models';
import {
  UserCountQueryDto,
  UserCreateBodyDto,
  UserDeleteParamsDto,
  UserFindManyQueryDto,
  UserFindUniqueParamsDto,
  UserFindUniqueQueryDto,
  UserUpdateBodyDto,
  UserUpdateParamsDto,
  UserUpsertBodyDto,
  UserUpsertParamsDto,
} from '@generated/rest-dtos';

export class UserService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL('user', apiUrl.toString());
  }

  /**
   * Create a new User
   *
   * @param createBody - Dto of the request body
   * @param options - Ajax request options
   * @returns a new User
   */
  public create$(
    createBody: UserCreateBodyDto,
    options?: CreateAjaxOptions,
  ): Observable<User> {
    return fromDto(createBody, UserCreateBodyDto).pipe(
      switchMap((body) =>
        create(this.apiUrl, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(User),
        ),
      ),
    );
  }

  /**
   * Create a new User
   *
   * @param options - Ajax request options
   * @returns a new User
   */
  public create(
    options?: CreateAjaxOptions,
  ): OperatorFunction<UserCreateBodyDto, User> {
    return switchMap((createBody) => this.create$(createBody, options));
  }

  /**
   * Count the number of User entities that matches the filter
   *
   * @param countQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns the number of User
   */
  public count$(
    countQuery?: UserCountQueryDto,
    options?: CountAjaxOptions,
  ): Observable<number> {
    return fromDto(countQuery, UserCountQueryDto).pipe(
      switchMap((query) =>
        count(this.apiUrl, { ...query }, options).pipe(
          extractAjaxResponseData(),
        ),
      ),
    );
  }

  /**
   * Count the number of User entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of User
   */
  public count(
    options?: CountAjaxOptions,
  ): OperatorFunction<UserCountQueryDto | undefined, number> {
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
    findUniqueParams: UserFindUniqueParamsDto,
    findUniqueQuery?: UserFindUniqueQueryDto,
    options?: FindUniqueOptions,
  ): Observable<User> {
    return zip(
      fromDto(findUniqueParams, UserFindUniqueParamsDto),
      fromDto(findUniqueQuery, UserFindUniqueQueryDto),
    ).pipe(
      switchMap(([params, query]) =>
        findUnique(this.apiUrl, params, { ...query }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(User),
        ),
      ),
    );
  }

  /**
   * Count the number of User entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of User
   */
  public findUnique(
    options?: FindUniqueOptions,
  ): OperatorFunction<
    | { params: UserFindUniqueParamsDto; query?: UserFindUniqueQueryDto }
    | [UserFindUniqueParamsDto, UserFindUniqueQueryDto]
    | UserFindUniqueParamsDto,
    User
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.findUnique$(source[0], source[1], options);
      if (isAlike(source, UserFindUniqueParamsDto))
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
    findManyQuery?: UserFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<User[]> {
    return fromDto(findManyQuery, UserFindManyQueryDto).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(User),
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
  ): OperatorFunction<UserFindManyQueryDto | undefined, User[]> {
    return switchMap((findManyQuery) => this.findMany$(findManyQuery, options));
  }

  /**
   * Update one User
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated User
   */
  public patch$(
    updateParams: UserUpdateParamsDto,
    updateBody: UserUpdateBodyDto,
    options?: PatchOptions,
  ): Observable<User> {
    return zip(
      fromDto(updateParams, UserUpdateParamsDto),
      fromDto(updateBody, UserUpdateBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        patch(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(User),
        ),
      ),
    );
  }

  /**
   * patch$ alias
   */
  public update$ = this.patch$.bind(this);

  /**
   * Update one User
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated User
   */
  public patch(
    options?: PatchOptions,
  ): OperatorFunction<
    | { params: UserUpdateParamsDto; body: UserUpdateBodyDto }
    | [UserUpdateParamsDto, UserUpdateBodyDto],
    User
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
   * Update one User
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated User
   */
  public upsert$(
    updateParams: UserUpsertParamsDto,
    updateBody: UserUpsertBodyDto,
    options?: UpsertOptions,
  ): Observable<User> {
    return zip(
      fromDto(updateParams, UserUpsertParamsDto),
      fromDto(updateBody, UserUpsertBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        upsert(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(User),
        ),
      ),
    );
  }

  /**
   * Update one User
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated User
   */
  public upsert(
    options?: UpsertOptions,
  ): OperatorFunction<
    | { params: UserUpsertParamsDto; body: UserUpsertBodyDto }
    | [UserUpsertParamsDto, UserUpsertBodyDto],
    User
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.upsert$(source[0], source[1], options);
      return this.upsert$(source.params, source.body, options);
    });
  }

  /**
   * Delete one User
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated User
   */
  public remove$(
    deleteParams: UserDeleteParamsDto,
    options?: RemoveOptions,
  ): Observable<User> {
    return fromDto(deleteParams, UserDeleteParamsDto).pipe(
      switchMap((params) =>
        remove(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(User),
        ),
      ),
    );
  }

  /**
   * remove$ alias
   */
  public delete$ = this.remove$.bind(this);

  /**
   * Delete one User
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated User
   */
  public remove(
    options?: RemoveOptions,
  ): OperatorFunction<UserDeleteParamsDto, User> {
    return switchMap((removeParams) => this.remove$(removeParams, options));
  }

  /**
   * remove alias
   */
  public delete = this.remove.bind(this);
}

