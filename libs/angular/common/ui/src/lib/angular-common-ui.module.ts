import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
/* import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form'; */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const antModules = [NzButtonModule, NzIconModule, NzSpinModule, NzTabsModule];

@NgModule({
  imports: [
    CommonModule,
    ...antModules,
    // AngularComponentsModule,
    // AngularFormModule,
  ],
  exports: [
    ...antModules,
    // AngularComponentsModule,
    // AngularFormModule
  ],
})
export class AngularCommonUiModule {}
