import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AngularFormModule } from '@tractr/angular-form';
import { AngularToolsModule } from '@tractr/angular-tools';

const fileStorageConfiguration = {
  defaultBucket: 'test',
  presignedDownloadEndpoint: 'http://localhost:3333/api/file-storage/download',
  presignedUploadEndpoint: 'http://localhost:3333/api/file-storage/upload',
};

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
    AngularToolsModule.forRoot({
      environment: {
        api: {
          uri: 'http://localhost:4200/api',
        },
        appCode: 'stack',
        appVersion: '1',
      },
    }),
    AngularComponentsModule,
    AngularFormModule,
    AngularAuthenticationModule.forRoot({
      api: {
        url: 'http://localhost:4200/api',
      },
      user: User,
    }),
    AngularAuthenticationRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
