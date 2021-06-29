import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularComponentsModule } from '@tractr/angular-components';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AngularComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
