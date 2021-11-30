import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClassConstructor } from 'class-transformer';

import {
  LoginComponent,
  LogoutComponent,
  LostPasswordComponent,
  LostPasswordPageComponent,
  ResetPasswordComponent,
  ResetPasswordPageComponent,
} from './components';
import { AUTHENTICATION_OPTIONS, SESSION_SERVICE } from './constants';
import { ConnectedDirective, NotConnectedDirective } from './directives';
import { AuthenticationOptions } from './dtos';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { AuthenticationPublicOptions } from './interfaces/authentication-public-options.interface';
import { PasswordService, SessionServiceFactory } from './services';

import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import {
  AngularToolsModule,
  AsyncOptions,
  ModuleOptionsFactory,
} from '@tractr/angular-tools';
import { transformAndValidate } from '@tractr/common';

@NgModule({
  imports: [AngularToolsModule, AngularComponentsModule, AngularFormModule],
  declarations: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
    LostPasswordComponent,
    LostPasswordPageComponent,
    ResetPasswordComponent,
    ResetPasswordPageComponent,
  ],
  providers: [
    IsLoggedGuard,
    IsNotLoggedGuard,
    {
      provide: SESSION_SERVICE,
      useFactory: SessionServiceFactory,
      deps: [AUTHENTICATION_OPTIONS],
    },
    PasswordService,
  ],
  exports: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
    LostPasswordComponent,
    LostPasswordPageComponent,
    ResetPasswordComponent,
    ResetPasswordPageComponent,
  ],
})
export class AngularAuthenticationModule extends ModuleOptionsFactory<
  AuthenticationOptions,
  AuthenticationPublicOptions
>(AUTHENTICATION_OPTIONS, transformAndValidate(AuthenticationOptions)) {
  static register<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >(
    options: AuthenticationPublicOptions<U, CCU>,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.register(options);
  }

  static forRoot<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >(
    options: AuthenticationPublicOptions<U, CCU>,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.forRoot(options);
  }

  static registerAsync<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >(
    options: AsyncOptions<
      AuthenticationOptions<U, CCU>,
      AuthenticationPublicOptions<U, CCU>
    >,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.registerAsync(options);
  }

  static forRootAsync<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >(
    options: AsyncOptions<
      AuthenticationOptions<U, CCU>,
      AuthenticationPublicOptions<U, CCU>
    >,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.forRootAsync(options);
  }
}
