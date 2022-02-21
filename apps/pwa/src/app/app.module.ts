import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  EyeInvisibleOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { User as UserType } from '@prisma/client';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { AppConfig } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoModule } from './demo/demo.module';
import {
  MoleculeConnectedComponent,
  MoleculeHomeComponent,
  MoleculeNotConnectedComponent,
} from './molecules';

import {
  AngularAuthenticationModule,
  AngularAuthenticationPasswordRoutingModule,
  AngularAuthenticationRoutingModule,
} from '@tractr/angular-authentication';
import { AngularCaslModule } from '@tractr/angular-casl';
import { AngularComponentsModule } from '@tractr/angular-components';
import {
  ANGULAR_CONFIG_SERVICE,
  AngularConfigModule,
  AngularConfigService,
} from '@tractr/angular-config';
import { FileStorageModule } from '@tractr/angular-file-storage';
import { AngularFormModule } from '@tractr/angular-form';
import { AngularToolsModule } from '@tractr/angular-tools';
import { AngularRextModule } from '@tractr/generated-angular-rext-client';
import { rolePermissions } from '@tractr/generated-casl';
import { User } from '@tractr/generated-models';

@NgModule({
  declarations: [
    AppComponent,
    MoleculeHomeComponent,
    MoleculeNotConnectedComponent,
    MoleculeConnectedComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularAuthenticationRoutingModule,
    AngularToolsModule,
    AngularComponentsModule,
    AngularFormModule,
    DemoModule,
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
    AngularAuthenticationPasswordRoutingModule,
    AngularConfigModule.forRoot(),
    NzIconModule.forRoot([EyeInvisibleOutline, PlusOutline]),
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
        appConfigService: AngularConfigService<AppConfig>,
      ) => {
        const fileStorageConfig = appConfigService.config?.fileStorage;

        if (!fileStorageConfig) throw new Error('Failed to load app config');

        return {
          ...defaultConfig,
          ...fileStorageConfig,
        };
      },
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
