import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorService {
  /**
   * Constructor
   */
  constructor(private message: NzMessageService) {}

  /**
   * Handle an error
   */
  handle(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttp(error);
    } else {
      this.show(error.message);
      // this.sendLog(error, false);
    }
  }

  /**
   * Handle an http error
   */
  private handleHttp(error: HttpErrorResponse): void {
    // Create message
    const message =
      error.error && error.error.error && error.error.message
        ? `${error.error.error as string}: ${error.error.message as string}`
        : error.message;
    // Show message
    this.show(message);
  }

  /**
   * Show the snackbar with the message
   */
  private show(message: string): void {
    this.message.create('error', message);
    console.error('ErrorService:', message);
  }
}
