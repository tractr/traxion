/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomEncoder } from './custom-encoder';

@Injectable()
export class EncodeHttpParamsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler, // : Observable<HttpEvent<any>>
  ) {
    const params = new HttpParams({
      encoder: new CustomEncoder(),
      fromString: req.params.toString(),
    });
    return next.handle(req.clone({ params }));
  }
}
