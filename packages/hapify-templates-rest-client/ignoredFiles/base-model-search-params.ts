import { ReplaySubject } from 'rxjs';

/** Used to export and import search params */
export interface BaseModelSearchParamsInterface {
  _page: string | number;
  _limit: string | number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  _populate?: string[];
}

/** Manage model search params */
export abstract class BaseModelSearchParams<
  T extends BaseModelSearchParamsInterface
> extends ReplaySubject<void> {
  /** Stores the properties of the instance */
  props: T;
  /** Default page number */
  protected defaultPage = 0;
  /** Default page length */
  protected defaultLimit = 10;
  /** Default sort */
  protected defaultSort: '_id' = '_id';
  /** Default order */
  protected defaultOrder: 'asc' | 'desc' = 'desc';

  /** Constructor */
  constructor(object: Partial<T> = <T>{}) {
    super();
    this.fromObject(object);
  }

  /** Populate the instance from an object (extracted from query string) */
  abstract fromObject(input: Partial<T>): void;
  /** Convert the instance to an object readable for the API and storable in the query string */
  abstract toObject(): T;
  /** List allowed keys for the interface */
  protected allowedKeys(): string[] {
    return ['_page', '_limit', '_sort', '_order', '_populate'];
  }
}
