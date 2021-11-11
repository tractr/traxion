import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
/* import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form'; */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { MenuMainComponent, TitlePageComponent } from './components';

const antModules = [
  NzButtonModule,
  NzIconModule,
  NzLayoutModule,
  NzSpinModule,
  NzTabsModule,
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ...antModules,
    // AngularComponentsModule,
    // AngularFormModule,
  ],
  exports: [
    ...antModules,
    // AngularComponentsModule,
    // AngularFormModule,
    MenuMainComponent,
    TitlePageComponent,
  ],
  declarations: [MenuMainComponent, TitlePageComponent],
})
export class AngularCommonUiModule {}
