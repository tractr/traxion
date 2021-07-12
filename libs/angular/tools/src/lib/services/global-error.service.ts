import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
  /**
   * Transmit an unhandled error to error service
   *
   */
  handleError(error: Error): void {
    // this.injector.get(ErrorService).handleGlobal(error);
    throw error;
  }
}
