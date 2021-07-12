import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  AUTH_OPTIONS,
  AuthenticationOptionsInterface,
  SESSION_SERVICE,
} from './authentication.config';
import { LoginComponent, LogoutComponent } from './components';
import { ConnectedDirective, NotConnectedDirective } from './directives';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { SessionServiceFactory } from './services';

import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import { AngularToolsModule } from '@tractr/angular-tools';

const defaultOptions: Partial<AuthenticationOptionsInterface> = {
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
};

@NgModule({
  imports: [AngularToolsModule, AngularComponentsModule, AngularFormModule],
  declarations: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
  ],
  providers: [IsLoggedGuard, IsNotLoggedGuard],
  exports: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
  ],
})
export class AngularAuthenticationModule {
  public static forRoot(
    options: AuthenticationOptionsInterface,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    // Overide default options
    const authenticationOptions: AuthenticationOptionsInterface = Object.assign(
      defaultOptions,
      options,
    );

    return {
      ngModule: AngularAuthenticationModule,
      providers: [
        { provide: AUTH_OPTIONS, useValue: authenticationOptions },
        {
          provide: SESSION_SERVICE,
          useFactory: SessionServiceFactory,
          deps: [AUTH_OPTIONS],
        },
      ],
    };
  }
}
