import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from '../environments/environment';

import {
  AngularAuthenticationModule,
  AuthenticationOptions,
} from '@trxn/angular-authentication';
import { AngularCaslModule } from '@trxn/angular-casl';
import {
  ANGULAR_CONFIG_SERVICE,
  AngularConfigModule,
  AngularConfigService,
} from '@trxn/angular-config';
import { ErrorModule, NzErrorModule } from '@trxn/angular-tools';
import { AngularRextModule } from '@trxn/generated-angular-rext-client';
import { rolePermissions } from '@trxn/generated-casl';
import { User } from '@trxn/generated-models';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,

    // Demo module
    AppRoutingModule,

    // Configuration modules
    AngularConfigModule.forRoot(),

    ErrorModule,
    NzErrorModule,

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

    // Authentication modules
    AngularAuthenticationModule.forRootFactory({
      useFactory: (
        appConfigService: AngularConfigService<AppConfig>,
      ): AuthenticationOptions => ({
        api: {
          url: appConfigService.config?.apiUri,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
