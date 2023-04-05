import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig, getConfig } from '../environments/environment';

import {
  AngularAuthenticationModule,
  AuthenticationOptions,
} from '@trxn/angular-authentication';
import { AngularCaslModule } from '@trxn/angular-casl';
import {
  AngularConfigInitializer,
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
    AngularConfigModule.forRoot({
      transformConfig: getConfig,
    }),

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
      deps: [AngularConfigService],
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
      deps: [AngularConfigService],
    }),
    AngularCaslModule.forRootAsync({
      useFactory: (defaultOptions) => ({
        ...defaultOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rolePermissions: rolePermissions as any,
      }),

      deps: [AngularConfigService],
    }),
  ],
  providers: [AngularConfigInitializer],
  bootstrap: [AppComponent],
})
export class AppModule {}
