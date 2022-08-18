import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputUiComponent } from './components';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [InputUiComponent],
  exports: [InputUiComponent],
})
export class AngularUiModule {}
