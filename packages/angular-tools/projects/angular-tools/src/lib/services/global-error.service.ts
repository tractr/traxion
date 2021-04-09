import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
	providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
	constructor(private injector: Injector) {}

	/**
	 * Transmit an unhandled error to error service
	 * 
	 */
	handleError(error: Error) {
		this.injector.get(ErrorService).handleGlobal(error);
		throw error;
	}
}