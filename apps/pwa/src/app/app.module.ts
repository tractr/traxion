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

import { User } from '@generated/models';
import {
  AngularAuthenticationModule,
  AngularAuthenticationRoutingModule,
} from '@tractr/angular-authentication';
import { AngularComponentsModule } from '@tractr/angular-components';
import {
  ANGULAR_CONFIG_SERVICE,
  AngularConfigModule,
  AngularConfigService,
  AppInitializerProvider,
} from '@tractr/angular-config';
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
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularToolsModule,
    AngularComponentsModule,
    AngularFormModule,
    AngularAuthenticationRoutingModule,
    AngularAuthenticationModule.forRootAsync({
      useFactory: (
        defaultOptions,
        appConfigService: AngularConfigService<AppConfig>,
      ) => {
        const config = appConfigService.value$.getValue();
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
    NzIconModule.forRoot([EyeInvisibleOutline, PlusOutline]),
    AngularConfigModule.forRoot({
      getConfig,
    }),
  ],
  providers: [AppInitializerProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
