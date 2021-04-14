import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AntCustomModule } from './shared/ant-custom.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoleculeHomeComponent } from './molecules/molecule-home/molecule-home.component';
import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  declarations: [AppComponent, MoleculeHomeComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AntCustomModule,
    TransferHttpCacheModule,
    AngularToolsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
