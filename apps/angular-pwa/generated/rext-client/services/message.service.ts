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

import { Message } from '@generated/models';
import {
  MessageCountQueryDto,
  MessageCreateBodyDto,
  MessageDeleteParamsDto,
  MessageFindManyQueryDto,
  MessageFindUniqueParamsDto,
  MessageFindUniqueQueryDto,
  MessageUpdateBodyDto,
  MessageUpdateParamsDto,
  MessageUpsertBodyDto,
  MessageUpsertParamsDto,
} from '@generated/rest-dtos';

export class MessageService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL('message', apiUrl.toString());
  }

  /**
   * Create a new Message
   *
   * @param createBody - Dto of the request body
   * @param options - Ajax request options
   * @returns a new Message
   */
  public create$(
    createBody: MessageCreateBodyDto,
    options?: CreateAjaxOptions,
  ): Observable<Message> {
    return fromDto(createBody, MessageCreateBodyDto).pipe(
      switchMap((body) =>
        create(this.apiUrl, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Message),
        ),
      ),
    );
  }

  /**
   * Create a new Message
   *
   * @param options - Ajax request options
   * @returns a new Message
   */
  public create(
    options?: CreateAjaxOptions,
  ): OperatorFunction<MessageCreateBodyDto, Message> {
    return switchMap((createBody) => this.create$(createBody, options));
  }

  /**
   * Count the number of Message entities that matches the filter
   *
   * @param countQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns the number of Message
   */
  public count$(
    countQuery?: MessageCountQueryDto,
    options?: CountAjaxOptions,
  ): Observable<number> {
    return fromDto(countQuery, MessageCountQueryDto).pipe(
      switchMap((query) =>
        count(this.apiUrl, { ...query }, options).pipe(
          extractAjaxResponseData(),
        ),
      ),
    );
  }

  /**
   * Count the number of Message entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Message
   */
  public count(
    options?: CountAjaxOptions,
  ): OperatorFunction<MessageCountQueryDto | undefined, number> {
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
    findUniqueParams: MessageFindUniqueParamsDto,
    findUniqueQuery?: MessageFindUniqueQueryDto,
    options?: FindUniqueOptions,
  ): Observable<Message> {
    return zip(
      fromDto(findUniqueParams, MessageFindUniqueParamsDto),
      fromDto(findUniqueQuery, MessageFindUniqueQueryDto),
    ).pipe(
      switchMap(([params, query]) =>
        findUnique(this.apiUrl, params, { ...query }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Message),
        ),
      ),
    );
  }

  /**
   * Count the number of Message entities that matches the filter
   *
   * @param options - Ajax request options
   * @returns the number of Message
   */
  public findUnique(
    options?: FindUniqueOptions,
  ): OperatorFunction<
    | { params: MessageFindUniqueParamsDto; query?: MessageFindUniqueQueryDto }
    | [MessageFindUniqueParamsDto, MessageFindUniqueQueryDto]
    | MessageFindUniqueParamsDto,
    Message
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.findUnique$(source[0], source[1], options);
      if (isAlike(source, MessageFindUniqueParamsDto))
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
    findManyQuery?: MessageFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<Message[]> {
    return fromDto(findManyQuery, MessageFindManyQueryDto).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Message),
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
  ): OperatorFunction<MessageFindManyQueryDto | undefined, Message[]> {
    return switchMap((findManyQuery) => this.findMany$(findManyQuery, options));
  }

  /**
   * Update one Message
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Message
   */
  public patch$(
    updateParams: MessageUpdateParamsDto,
    updateBody: MessageUpdateBodyDto,
    options?: PatchOptions,
  ): Observable<Message> {
    return zip(
      fromDto(updateParams, MessageUpdateParamsDto),
      fromDto(updateBody, MessageUpdateBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        patch(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Message),
        ),
      ),
    );
  }

  /**
   * patch$ alias
   */
  public update$ = this.patch$.bind(this);

  /**
   * Update one Message
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Message
   */
  public patch(
    options?: PatchOptions,
  ): OperatorFunction<
    | { params: MessageUpdateParamsDto; body: MessageUpdateBodyDto }
    | [MessageUpdateParamsDto, MessageUpdateBodyDto],
    Message
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
   * Update one Message
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Message
   */
  public upsert$(
    updateParams: MessageUpsertParamsDto,
    updateBody: MessageUpsertBodyDto,
    options?: UpsertOptions,
  ): Observable<Message> {
    return zip(
      fromDto(updateParams, MessageUpsertParamsDto),
      fromDto(updateBody, MessageUpsertBodyDto),
    ).pipe(
      switchMap(([params, body]) =>
        upsert(this.apiUrl, params, body, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Message),
        ),
      ),
    );
  }

  /**
   * Update one Message
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param updateParams - Dto of the request param
   * @param updateBody - Dto of the request body
   * @param options - Ajax request options
   * @returns the updated Message
   */
  public upsert(
    options?: UpsertOptions,
  ): OperatorFunction<
    | { params: MessageUpsertParamsDto; body: MessageUpsertBodyDto }
    | [MessageUpsertParamsDto, MessageUpsertBodyDto],
    Message
  > {
    return switchMap((source) => {
      if (Array.isArray(source))
        return this.upsert$(source[0], source[1], options);
      return this.upsert$(source.params, source.body, options);
    });
  }

  /**
   * Delete one Message
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Message
   */
  public remove$(
    deleteParams: MessageDeleteParamsDto,
    options?: RemoveOptions,
  ): Observable<Message> {
    return fromDto(deleteParams, MessageDeleteParamsDto).pipe(
      switchMap((params) =>
        remove(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(Message),
        ),
      ),
    );
  }

  /**
   * remove$ alias
   */
  public delete$ = this.remove$.bind(this);

  /**
   * Delete one Message
   *
   * @param deleteParams - Dto of the request param
   * @param options - Ajax request options
   * @returns the updated Message
   */
  public remove(
    options?: RemoveOptions,
  ): OperatorFunction<MessageDeleteParamsDto, Message> {
    return switchMap((removeParams) => this.remove$(removeParams, options));
  }

  /**
   * remove alias
   */
  public delete = this.remove.bind(this);
}

