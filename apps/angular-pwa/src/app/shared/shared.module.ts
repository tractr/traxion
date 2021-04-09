import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [],
    imports: [
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      CommonModule,
      /**
       * Add here NgZorro component
       * ----------- */
      /** ----------- */
    ],
    exports: [
      /**
       * Add here NgZorro component
       * ----------- */
      /** ----------- */
    ],
    providers: [
      /**
       * Uncomment only if you use component with translatable texts (ex: nzCalendar)
       * Check others modules and shared/i18n.service for other code lines to uncomment in order to make everything work.
       * -------------
       * ...nzProviders
       * -------------
       */
    ],
  })
  export class SharedModule {}