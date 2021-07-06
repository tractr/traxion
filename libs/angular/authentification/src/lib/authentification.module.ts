import { ModuleWithProviders, NgModule } from '@angular/core';

import { AuthentificationForRootInterface } from './authentification-for-root.interface';
import { LoginComponent, LogoutComponent } from './components';
import { ConnectedDirective, NotConnectedDirective } from './directives';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { SessionService } from './services';

import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  imports: [AngularToolsModule],
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
    params: AuthentificationForRootInterface,
  ): ModuleWithProviders<AngularAuthentificationModule> {
    return {
      ngModule: AngularAuthentificationModule,
      providers: [
        SessionService,
        {
          provide: 'environment',
          useValue: params.environment,
        },
      ],
    };
  }
}
