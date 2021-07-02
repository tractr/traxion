import { ModuleWithProviders, NgModule } from '@angular/core';

import { AuthentificationForRootInterface } from './authentification-for-root.interface';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LogoutComponent, SignInComponent } from './components';
import { IsLoggedGuard, IsNotLoggedGuard } from './guards';
import { SessionService } from './services';

import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  imports: [AngularToolsModule, AuthentificationRoutingModule],
  declarations: [LogoutComponent, SignInComponent],
  providers: [SessionService, IsLoggedGuard, IsNotLoggedGuard],
  exports: [AuthentificationRoutingModule, LogoutComponent, SignInComponent],
})
export class AuthentificationModule {
  public static forRoot(
    params: AuthentificationForRootInterface,
  ): ModuleWithProviders<AuthentificationModule> {
    return {
      ngModule: AuthentificationModule,
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
