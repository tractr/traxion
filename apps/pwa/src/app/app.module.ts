import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  EyeInvisibleOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { AppConfig, getConfig } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MoleculeConnectedComponent,
  MoleculeHomeComponent,
  MoleculeNotConnectedComponent,
} from './molecules';

import { AngularRextModule } from '@generated/angular-rext-client';
import { rolePermissions } from '@generated/casl';
import { User } from '@generated/models';
import {
  AngularAuthenticationModule,
  AngularAuthenticationRoutingModule,
  SESSION_SERVICE,
} from '@tractr/angular-authentication';
import { AngularCaslModule } from '@tractr/angular-casl';
import { AngularComponentsModule } from '@tractr/angular-components';
import {
  ANGULAR_CONFIG_SERVICE,
  AngularConfigModule,
  AngularConfigService,
  AppInitializerProvider,
} from '@tractr/angular-config';
import { FileStorageModule } from '@tractr/angular-file-storage';
import { AngularFormModule } from '@tractr/angular-form';
import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  declarations: [
    MoleculeHomeComponent,
    MoleculeNotConnectedComponent,
    MoleculeConnectedComponent,
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularAuthenticationRoutingModule,
    AngularToolsModule,
    AngularComponentsModule,
    AngularFormModule,
    AngularAuthenticationModule.forRootAsync({
      useFactory: (
        defaultOptions,
        appConfigService: AngularConfigService<AppConfig>,
      ) => {
        const { config } = appConfigService;
        console.log(defaultOptions, appConfigService);
        return {
          ...defaultOptions,
          api: {
            url: (config && config.apiUri) || '',
          },
          user: User,
        };
      },
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
    AngularCaslModule.forRootAsync({
      useFactory: (defaultOptions, sessionService) => ({
        ...defaultOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rolePermissions: rolePermissions as any,
        me$: sessionService.me$,
      }),
      deps: [SESSION_SERVICE],
    }),
    NzIconModule.forRoot([EyeInvisibleOutline, PlusOutline]),
    AngularConfigModule.forRoot({
      getConfig,
    }),
    AngularRextModule.forRootAsync({
      useFactory: (_, appConfigService: AngularConfigService<AppConfig>) => ({
        api: {
          url: appConfigService.config?.apiUri || '',
        },
        user: User,
      }),
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
    FileStorageModule.forRootAsync({
      useFactory: (
        defaultConfig,
        angularConfigService: AngularConfigService<AppConfig>,
      ) => {
        const fileStorageConfig = angularConfigService.config?.fileStorage;

        if (!fileStorageConfig) throw new Error('Failed to load app config');

        return {
          ...defaultConfig,
          ...fileStorageConfig,
        };
      },
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
  ],
  providers: [AppInitializerProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
