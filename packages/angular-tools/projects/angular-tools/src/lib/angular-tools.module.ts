import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  MaxPipe,
  MinPipe,
  SafeHtmlPipe,
  StripHtmlPipe,
  TranslateCutPipe,
  TranslateEntryPipe,
} from './pipes';
import { ErrorService, GlobalErrorService, ResizeService, EncodeHttpParamsInterceptor, ExplainErrorsService} from './services';
import { TranslateModuleLoad } from './translate-import';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export interface AngularToolsEnvironmentInterface {
  api: {
    uri: string;
  };
  appCode: string;
  appVersion: string;
}

export interface AngularToolsForRootInterface {
  environment: AngularToolsEnvironmentInterface;
}

export enum AngularToolsInjectionKeysEnum {
  ENVIRONMENT = 'env',
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    TranslateModuleLoad(),
    NzButtonModule,
    NzFormModule,
    NzInputModule,
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
    {
      provide: ErrorHandler,
      useClass: GlobalErrorService
    },
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
