import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularAuthenticationModule } from '@tractr/angular-authentication';
import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularToolsModule.forRoot({
      environment: {
        api: {
          uri: 'http://localhost:4200',
        },
        appCode: 'stack',
        appVersion: '1',
      },
    }),
    AngularComponentsModule,
    AngularFormModule,
    AngularAuthenticationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
