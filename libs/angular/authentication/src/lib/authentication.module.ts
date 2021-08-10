import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  LoginComponent,
  LogoutComponent,
  LostPasswordComponent,
  LostPasswordPageComponent,
  ResetPasswordComponent,
  ResetPasswordPageComponent,
} from './components';
import {
  AUTH_DEFAULT_OPTIONS,
  AUTH_OPTIONS,
  AuthenticationDefaultOptions,
  AuthenticationOptions,
  AuthenticationPublicOptions,
  SESSION_SERVICE,
} from './configs';
import { ConnectedDirective, NotConnectedDirective } from './directives';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { PasswordService, SessionServiceFactory } from './services';

import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import {
  AngularToolsModule,
  AsyncOptions,
  ModuleOptionsFactory,
} from '@tractr/angular-tools';

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
      deps: [AUTH_OPTIONS],
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
  AuthenticationPublicOptions,
  AuthenticationDefaultOptions
>(AUTH_OPTIONS, AUTH_DEFAULT_OPTIONS) {
  static register(
    options: AuthenticationPublicOptions,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.register(options);
  }

  static forRoot(
    options: AuthenticationPublicOptions,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.forRoot(options);
  }

  static registerAsync(
    options: AsyncOptions<
      AuthenticationOptions,
      AuthenticationPublicOptions,
      AuthenticationDefaultOptions
    >,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.registerAsync(options);
  }

  static forRootAsync(
    options: AsyncOptions<
      AuthenticationOptions,
      AuthenticationPublicOptions,
      AuthenticationDefaultOptions
    >,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return super.forRootAsync(options);
  }
}
