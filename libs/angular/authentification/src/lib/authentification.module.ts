import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  AUTH_OPTIONS,
  AuthentificationForRootInterface,
  AuthentificationOptionsInterface,
} from './authentification.config';
import { LoginComponent, LogoutComponent } from './components';
import { ConnectedDirective, NotConnectedDirective } from './directives';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { SessionService } from './services';

import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import { AngularToolsModule } from '@tractr/angular-tools';

const defaultOptions: AuthentificationOptionsInterface = {
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
};

@NgModule({
  imports: [AngularToolsModule, AngularComponentsModule, AngularFormModule],
  declarations: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
  ],
  providers: [SessionService, IsLoggedGuard, IsNotLoggedGuard],
  exports: [
    LogoutComponent,
    LoginComponent,
    ConnectedDirective,
    NotConnectedDirective,
  ],
})
export class AngularAuthentificationModule {
  public static forRoot(
    overide: Partial<AuthentificationForRootInterface> = {},
  ): ModuleWithProviders<AngularAuthentificationModule> {
    // Overide default options
    const options: AuthentificationOptionsInterface = Object.assign(
      defaultOptions,
      overide.options,
    );

    return {
      ngModule: AngularAuthentificationModule,
      providers: [SessionService, { provide: AUTH_OPTIONS, useValue: options }],
    };
  }
}
