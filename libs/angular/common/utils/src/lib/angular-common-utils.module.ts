import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageService } from './services/page.service';

@NgModule({
  imports: [CommonModule],
  providers: [PageService],
})
export class AngularCommonUtilsModule {}
