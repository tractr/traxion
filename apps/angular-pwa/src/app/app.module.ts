import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AngularToolsModule } from '@tractr/angular-tools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoleculeHomeComponent } from './molecules/molecule-home/molecule-home.component';
import { AntCustomModule } from './shared/ant-custom.module';

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
