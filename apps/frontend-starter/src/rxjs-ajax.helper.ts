import { Observable } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { request } from 'universal-rxjs-ajax';

export function ajax(options: string | AjaxRequest): Observable<AjaxResponse> {
  return request(typeof options === 'string' ? { url: options } : options);
}
