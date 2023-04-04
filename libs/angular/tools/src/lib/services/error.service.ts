import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error) {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse) {
    return error.message;
  }

  getServerStack(error: HttpErrorResponse) {
    if (isDevMode()) return error.error.stack as string;

    return undefined;
  }
}
