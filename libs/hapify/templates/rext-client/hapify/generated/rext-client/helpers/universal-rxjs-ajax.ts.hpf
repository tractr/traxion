// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../typings/xhr2.d.ts" />

import { Observable } from 'rxjs';
import { ajax, AjaxConfig, AjaxResponse } from 'rxjs/ajax';
import * as xhr2 from 'xhr2';

const XHR2 = typeof XMLHttpRequest !== 'undefined' ? XMLHttpRequest : xhr2;

export const request = function request<T>(
  config: AjaxConfig,
): Observable<AjaxResponse<T>> {
  return ajax<T>({ createXHR: () => new XHR2(), ...config });
};
