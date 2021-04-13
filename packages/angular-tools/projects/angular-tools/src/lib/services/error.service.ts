import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AngularToolsEnvironmentInterface } from '../angular-tools-for-root.interface';
import { AngularToolsInjectionKeysEnum } from '../angular-tools-injection-keys.enum';

@Injectable()
export class ErrorService {
  /**
   * Route for session
   */
  private logUri = `${this.environment.api.uri}/front-end-error`;

  /**
   * Constructor
   */
  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    @Inject(AngularToolsInjectionKeysEnum.ENVIRONMENT)
    private environment: AngularToolsEnvironmentInterface,
  ) {}

  /**
   * Handle an unhandled error
   */
  handleGlobal(error: Error): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.sendLog(error, true);
  }

  /**
   * Handle an error
   */
  handle(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttp(error);
    } else {
      this.show(error.message);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.sendLog(error, false);
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
  }

  /**
   * The error details to back-end
   */
  private async sendLog(error: Error, unhandled: boolean): Promise<void> {
    const options = { withCredentials: true };
    const body = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      user_agent: navigator.userAgent,
      platform: navigator.platform,
      url: window.location.href,
      unhandled,
      app_name: this.environment.appCode,
      app_version: this.environment.appVersion,
    };

    await this.http
      .post(this.logUri, body, options)
      .toPromise()
      .catch((e) => {
        console.error('An error occurred while sending logs to back-end', e);
      });
  }
}
