import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

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
  GlobalErrorService,
  ResizeService,
} from './services';
import { TranslateModuleLoad } from './translate-import';

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
      useClass: GlobalErrorService,
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
