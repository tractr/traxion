import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ClassConstructor } from 'class-transformer';

import {
  LoginComponent,
  LogoutComponent,
  LostPasswordComponent,
  LostPasswordPageComponent,
  ResetPasswordComponent,
  ResetPasswordPageComponent,
} from './components';
import { AUTHENTICATION_OPTIONS, AUTHENTICATION_USER_DTO } from './constants';
import { ConnectedDirective, NotConnectedDirective } from './directives';
import { AuthenticationOptions } from './dtos';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { AuthenticationPublicOptions, UserOptions } from './interfaces';
import { PasswordService, SessionService } from './services';

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
  providers: [IsLoggedGuard, IsNotLoggedGuard, SessionService, PasswordService],
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
  >({
    user,
    ...options
  }: AuthenticationPublicOptions &
    UserOptions<U, CCU>): ModuleWithProviders<AngularAuthenticationModule> {
    return this.mergeModuleWithProvider(
      super.register(options),
      this.createUserProvider(user),
    );
  }

  static forRoot<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >({
    user,
    ...options
  }: AuthenticationPublicOptions &
    UserOptions<U, CCU>): ModuleWithProviders<AngularAuthenticationModule> {
    return this.mergeModuleWithProvider(
      super.forRoot(options),
      this.createUserProvider(user),
    );
  }

  static registerAsync<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >({
    user,
    ...options
  }: AsyncOptions<AuthenticationOptions, AuthenticationPublicOptions> &
    UserOptions<U, CCU>): ModuleWithProviders<AngularAuthenticationModule> {
    return this.mergeModuleWithProvider(
      super.registerAsync(options),
      this.createUserProvider(user),
    );
  }

  static forRootAsync<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >({
    user,
    ...options
  }: AsyncOptions<AuthenticationOptions, AuthenticationPublicOptions> &
    UserOptions<U, CCU>): ModuleWithProviders<AngularAuthenticationModule> {
    return this.mergeModuleWithProvider(
      super.forRootAsync(options),
      this.createUserProvider(user),
    );
  }

  static createUserProvider<
    U extends Record<string, unknown> = Record<string, unknown>,
    CCU extends ClassConstructor<U> = ClassConstructor<U>,
  >(user: CCU): Provider {
    return {
      provide: AUTHENTICATION_USER_DTO,
      useValue: user,
    };
  }

  static mergeModuleWithProvider(
    module: ModuleWithProviders<AngularAuthenticationModule>,
    user: Provider,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return {
      ...module,
      providers: [...(module?.providers ?? []), user],
    };
  }
}
