import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AUTHENTICATION_OPTIONS } from '../constants';
import { AuthenticationModuleOptions } from '../types';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  private resetPassword!: string;

  /** Constructor */
  constructor(
    @Inject(AUTHENTICATION_OPTIONS)
    private options: AuthenticationModuleOptions,
    private http: HttpClient,
  ) {
    this.resetPassword = this.options.api.getEndpoint('resetPassword');
  }

  /** Send request to API for a new password token */
  async request(login: string): Promise<void> {
    await lastValueFrom(this.http.post(this.resetPassword, { login }));
  }

  /** Do the password reset */
  async reset(
    userId: string,
    resetCode: string,
    newPassword: string,
  ): Promise<void> {
    const body = {
      id: userId,
      code: resetCode,
      password: newPassword,
    };
    await lastValueFrom(this.http.put(this.resetPassword, body));
  }
}
