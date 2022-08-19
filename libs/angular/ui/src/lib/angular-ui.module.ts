import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonUiComponent, InputUiComponent } from './components';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [InputUiComponent, ButtonUiComponent],
  exports: [ButtonUiComponent, InputUiComponent],
})
export class AngularUiModule {}
