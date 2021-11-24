import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularFormModule } from '@tractr/angular-form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { MenuMainUiComponent, TitlePageUiComponent } from './components';

const antModules = [
  NzButtonModule,
  NzIconModule,
  NzLayoutModule,
  NzSpinModule,
  NzTabsModule,
  NzRadioModule,
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ...antModules,
    AngularComponentsModule,
    AngularFormModule,
  ],
  declarations: [MenuMainUiComponent, TitlePageUiComponent],
  exports: [
    TranslateModule,
    ...antModules,
    AngularComponentsModule,
    AngularFormModule,
    MenuMainUiComponent,
    TitlePageUiComponent,
  ],
})
export class AngularCommonUiModule {}
