import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AUTHENTICATION_OPTIONS } from '../constants';
import { AuthenticationOptions } from '../dtos';

@Injectable()
export class PasswordService {
  private resetUrl!: string;

  /** Constructor */
  constructor(
    @Inject(AUTHENTICATION_OPTIONS)
    private options: AuthenticationOptions,
    private http: HttpClient,
  ) {
    this.resetUrl = `${this.options.api.url}/${this.options.password.resetUrl}`;
  }

  /** Send request to API for a new password token */
  async request(email: string): Promise<void> {
    await lastValueFrom(this.http.post(this.resetUrl, { email }));
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
    await lastValueFrom(this.http.put(this.resetUrl, body));
  }
}
