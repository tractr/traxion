import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

const antModules = [NzButtonModule, NzIconModule];

@NgModule({
  imports: [
    CommonModule,
    ...antModules,
    AngularComponentsModule,
    AngularFormModule,
  ],
  exports: [...antModules, AngularComponentsModule, AngularFormModule],
})
export class PwaCommonUiModule {}
