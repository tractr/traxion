/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AngularToolsModule } from '@tractr/angular-tools';
import { UiModule } from '@tractr/nx-test-maxim';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoleculeHomeComponent } from './molecules/molecule-home/molecule-home.component';
import { AntCustomModule } from './shared/ant-custom.module';

import { AngularRextModule } from '@generated/angular-rext-client/angular-rext.module';

@NgModule({
  declarations: [AppComponent, MoleculeHomeComponent],
  imports: [
    AppRoutingModule,
    UiModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AntCustomModule,
    TransferHttpCacheModule,
    AngularToolsModule,
    AngularRextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
