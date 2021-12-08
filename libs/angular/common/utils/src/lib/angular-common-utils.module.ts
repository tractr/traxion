import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PageService } from './services/page.service';

@NgModule({
  imports: [CommonModule],
  providers: [NzNotificationService, PageService],
})
export class AngularCommonUtilsModule {}
