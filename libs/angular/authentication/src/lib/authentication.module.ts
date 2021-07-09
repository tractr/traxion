import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  AUTH_OPTIONS,
  AuthenticationForRootInterface,
  AuthenticationOptionsInterface,
} from './authentication.config';
import {
  LoginComponent,
  LogoutComponent,
  LostPasswordComponent,
  LostPasswordPageComponent,
} from './components';
import { ConnectedDirective, NotConnectedDirective } from './directives';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { PasswordService, SessionService } from './services';

import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import { AngularToolsModule } from '@tractr/angular-tools';

const defaultOptions: AuthenticationOptionsInterface = {
  api: {
    url: 'http://localhost:4200/api',
  },
  routing: {
    prefix: ['/'],
  },
  login: {
    url: 'login',
    routing: 'login',
    redirect: ['/'],
  },
  logout: {
    url: 'logout',
    redirect: ['/'],
  },
  session: {
    url: 'me',
  },
  password: {
    disable: false,
    reset: {
      url: 'password/reset',
    },
  },
};

@NgModule({
  imports: [AngularToolsModule, AngularComponentsModule, AngularFormModule],
  declarations: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
    LostPasswordComponent,
    LostPasswordPageComponent,
  ],
  providers: [SessionService, IsLoggedGuard, IsNotLoggedGuard],
  exports: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
    LostPasswordComponent,
    LostPasswordPageComponent,
  ],
})
export class AngularAuthenticationModule {
  public static forRoot(
    overide: Partial<AuthenticationForRootInterface> = {},
  ): ModuleWithProviders<AngularAuthenticationModule> {
    // Overide default options
    const options: AuthenticationOptionsInterface = Object.assign(
      defaultOptions,
      overide.options,
    );

    return {
      ngModule: AngularAuthenticationModule,
      providers: [
        SessionService,
        IsLoggedGuard,
        IsNotLoggedGuard,
        { provide: AUTH_OPTIONS, useValue: options },
        ...(!options.password.disable ? [PasswordService] : []),
      ],
    };
  }
}
