import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { Subject } from 'rxjs';

import { BaseInputComponent } from '../../base';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-input-number-ui',
  templateUrl: './input-number-ui.component.html',
  styleUrls: ['./input-number-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputNumberUiComponent
  extends BaseInputComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() placeholder?: string;

  value$ = new Subject<number | undefined>();

  override prefixId = 'trxn-input-number-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Number';
  }

  override onChange = (event: Event) => {
    const value = parseInt((event.target as HTMLInputElement).value, 10);

    this.value$.next(Number.isNaN(value) ? undefined : value);
  };
}
