/* eslint-disable */
import { BaseModel, BaseModelInterface } from './base-model';
import { BaseModelSearchParamsInterface } from './base-model-search-params';

/** Interface for listings result */
interface BaseModelSearchResultInterface<T> {
  page: number;
  limit: number;
  count: number;
  total: number;
  items: T[];
}

/** Interface for count results */
interface BaseModelCountResultInterface {
  total: number;
}

interface BaseReadQueryInterface {
  _populate?: string[];
}

@Injectable()
export abstract class BaseModelService<
  T extends BaseModel<BaseModelInterface, P>,
  I extends BaseModelInterface,
  P extends {},
  S extends BaseModelSearchParamsInterface
> {
  /** Removes credentials on read action to allow shared caching */
  protected publicRead = false;
  /** Removes credentials on list action to allow shared caching */
  protected publicList = false;
  /** Removes credentials on count action to allow shared caching */
  protected publicCount = false;

  /** Avoid parallels API calls */
  protected cache: {
    [key: string]: { promise: Promise<any>; timeout: any };
  } = {};
  protected cacheTtl = 300; // -1 To disable

  /** Constructor */
  constructor(protected http: HttpClient) {}

  /** Create a new model */
  create(payload: P, query: BaseReadQueryInterface = {}): Promise<T> {
    // Start request
    const options = {
      withCredentials: true,
      params: query as {},
    };
    return this.http
      .post<I>(`${this.uri()}`, payload, options)
      .toPromise()
      .then((result) => {
        this.flushCache();
        return this.new(result);
      });
  }
  /** Update an model selected from it's id */
  update(id: string, payload: Partial<P>): Promise<void> {
    // Start request
    const options = { withCredentials: true };
    return this.http
      .patch<void>(`${this.uri()}/${id}`, payload, options)
      .toPromise()
      .then(() => {
        this.flushCache();
      });
  }
  /** Get an model from it's id */
  get(id: string, query: BaseReadQueryInterface = {}): Promise<T> {
    // Return cache if exists
    const key = this.getCacheKey('get', id);
    const cache = this.getCache<T>(key);
    if (cache) return cache;

    // Start request
    const options = {
      withCredentials: !this.publicRead,
      params: query as {},
    };
    const promise = this.http
      .get<I>(`${this.uri()}/${id}`, options)
      .toPromise()
      .then((result) => this.new(result));

    // Store cache
    this.setCache(key, promise);

    return promise;
  }
  /** Delete an model selected from it's id */
  remove(id: string): Promise<void> {
    // Start request
    const options = { withCredentials: true };
    return this.http
      .delete<void>(`${this.uri()}/${id}`, options)
      .toPromise()
      .then(() => {
        this.flushCache();
      });
  }
  /** Get list for model search */
  list(
    searchParams: S,
    bypassTransform = false,
  ): Promise<BaseModelSearchResultInterface<T>> {
    // Return cache if exists
    const key = this.getCacheKey('list', searchParams);
    const cache = this.getCache<BaseModelSearchResultInterface<T>>(key);
    if (cache) return cache;

    // Start request
    const options = {
      withCredentials: !this.publicList,
      params: bypassTransform
        ? searchParams
        : (this.transformSearchParams(searchParams) as {}),
    };
    const promise = this.http
      .get<BaseModelSearchResultInterface<I>>(`${this.uri()}`, options)
      .toPromise()
      .then((result) => {
        // Create list from results
        return {
          page: result.page,
          limit: result.limit,
          count: result.count,
          total: result.total,
          items: result.items.map((item): T => this.new(item)),
        };
      });

    // Store cache
    this.setCache(key, promise);

    return promise;
  }
  /** Count for model */
  count(searchParams: S, bypassTransform = false): Promise<number> {
    // Return cache if exists
    const key = this.getCacheKey('count', searchParams);
    const cache = this.getCache<number>(key);
    if (cache) return cache;

    // Remove unwanted properties
    const params = Object.assign(
      {},
      bypassTransform ? searchParams : this.transformSearchParams(searchParams),
    );
    delete params._page;
    delete params._limit;
    delete params._order;
    delete params._sort;
    // Start request
    const options = {
      withCredentials: !this.publicCount,
      params: params as {},
    };
    const promise = this.http
      .get<BaseModelCountResultInterface>(`${this.uri()}/count`, options)
      .toPromise()
      .then((result) => result.total);

    // Store cache
    this.setCache(key, promise);

    return promise;
  }

  /** Returns the base URI for this model */
  protected uri(): string {
    return `${environment.api.uri}/${this.path()}`;
  }

  /** Transform search params before search & count */
  protected transformSearchParams(searchParams: S): S {
    return searchParams;
  }

  /** Create a cache key for any value type */
  protected getCacheKey(context: string, value: any) {
    return `${context}:${JSON.stringify(value)}`;
  }

  /** Store a promise in cache */
  protected setCache(key: string, promise: Promise<any>): void {
    if (this.cacheTtl >= 0) {
      const timeout = setTimeout(() => this.unsetCache(key), this.cacheTtl);
      this.cache[key] = { promise, timeout };
    }
  }

  /** Store a promise in cache */
  protected getCache<V>(key: string): Promise<V> {
    return this.cache[key] ? this.cache[key].promise : null;
  }

  /** Store a promise in cache */
  protected unsetCache(key: string): void {
    if (this.cache[key]) {
      clearTimeout(this.cache[key].timeout);
      delete this.cache[key];
    }
  }

  /** Force cache refresh */
  flushCache(): void {
    Object.keys(this.cache).forEach((key) => this.unsetCache(key));
  }

  /** Returns the base URI for this model */
  protected abstract path(): string;

  /** Create a new instance for this payload */
  protected abstract new(object: I): T;
}
