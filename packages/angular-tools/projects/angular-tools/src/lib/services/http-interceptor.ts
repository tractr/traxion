import {
	HttpInterceptor,
	HttpRequest,
	HttpEvent,
	HttpHandler,
	HttpParams,
	HttpParameterCodec,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EncodeHttpParamsInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const params = new HttpParams({
			encoder: new CustomEncoder(),
			fromString: req.params.toString(),
		});
		return next.handle(req.clone({ params }));
	}
}

class CustomEncoder implements HttpParameterCodec {
	encodeKey(key: string): string {
		return encodeURIComponent(key);
	}

	encodeValue(value: string): string {
		return encodeURIComponent(value);
	}

	decodeKey(key: string): string {
		return decodeURIComponent(key);
	}

	decodeValue(value: string): string {
		return decodeURIComponent(value);
	}
}