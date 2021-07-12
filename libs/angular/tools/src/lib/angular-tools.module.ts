/* eslint-disable import/no-extraneous-dependencies */

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AngularToolsForRootInterface } from './angular-tools-for-root.interface';
import { AngularToolsInjectionKeysEnum } from './angular-tools-injection-keys.enum';
import {
  MaxPipe,
  MinPipe,
  SafeHtmlPipe,
  StripHtmlPipe,
  TranslateCutPipe,
  TranslateEntryPipe,
} from './pipes';
import {
  EncodeHttpParamsInterceptor,
  ErrorService,
  ExplainErrorsService,
  ResizeService,
} from './services';
import { HttpLoaderFactory } from './translate-import';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
  ],
  declarations: [
    MaxPipe,
    MinPipe,
    StripHtmlPipe,
    SafeHtmlPipe,
    TranslateCutPipe,
    TranslateEntryPipe,
  ],
  providers: [
    ErrorService,
    /* {
      provide: ErrorHandler,
      useClass: GlobalErrorService,
    }, */
    ResizeService,
    ExplainErrorsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncodeHttpParamsInterceptor,
      multi: true,
    },
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    MaxPipe,
    MinPipe,
    StripHtmlPipe,
    SafeHtmlPipe,
    TranslateCutPipe,
    TranslateEntryPipe,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
  ],
})
export class AngularToolsModule {
  public static forRoot(
    params: AngularToolsForRootInterface,
  ): ModuleWithProviders<AngularToolsModule> {
    return {
      ngModule: AngularToolsModule,
      providers: [
        {
          provide: AngularToolsInjectionKeysEnum.ENVIRONMENT,
          useValue: params.environment,
        },
      ],
    };
  }
}
