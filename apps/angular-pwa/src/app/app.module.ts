/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoleculeHomeComponent } from './molecules/molecule-home/molecule-home.component';
import { AntCustomModule } from './shared/ant-custom.module';

import { AngularRextModule } from '@generated/angular';
import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  declarations: [AppComponent, MoleculeHomeComponent],
  imports: [
    AppRoutingModule,
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
