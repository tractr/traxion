import { ClassConstructor } from 'class-transformer';
import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import { findMany, transformAndValidateMap } from './common.crud';

export function RextClient<T>(model: ClassConstructor<T>) {
  return class {
    public apiUrl: URL;

    constructor(apiUrl: URL) {
      this.apiUrl = apiUrl;
    }

    findMany(searchParams: unknown): Observable<T[]> {
      return findMany(this.apiUrl.toString(), searchParams).pipe(
        map((response) => response[0]),
        transformAndValidateMap(model),
      );
    }
  };
}
