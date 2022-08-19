import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { User as UserType } from '@prisma/client';

import { AppConfig } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  AngularAuthenticationModule,
  AngularAuthenticationRoutingModule,
} from '@tractr/angular-authentication';
import { AngularCaslModule } from '@tractr/angular-casl';
import {
  ANGULAR_CONFIG_SERVICE,
  AngularConfigModule,
  AngularConfigService,
} from '@tractr/angular-config';
import { AngularRextModule } from '@tractr/generated-angular-rext-client';
import { rolePermissions } from '@tractr/generated-casl';
import { User } from '@tractr/generated-models';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,

    // Demonstation module
    AppRoutingModule,

    // Configuration modules
    AngularConfigModule.forRoot(),

    // Rext client
    AngularRextModule.forRootAsync({
      useFactory: (_, appConfigService: AngularConfigService<AppConfig>) => ({
        api: {
          url: appConfigService.config?.apiUri || '',
        },
        user: User,
      }),
      deps: [ANGULAR_CONFIG_SERVICE],
    }),

    // // Authentication modules
    AngularAuthenticationRoutingModule,
    AngularAuthenticationModule.forRootAsync<UserType>({
      user: User,
      useFactory: (
        defaultOptions,
        appConfigService: AngularConfigService<AppConfig>,
      ) => ({
        ...defaultOptions,
        api: {
          url: appConfigService.config?.apiUri || '',
        },
        login: {
          url: 'login',
          routing: 'login',
          redirect: ['/'],
        },
      }),
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
    AngularCaslModule.forRootAsync({
      useFactory: (defaultOptions) => ({
        ...defaultOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rolePermissions: rolePermissions as any,
      }),
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
