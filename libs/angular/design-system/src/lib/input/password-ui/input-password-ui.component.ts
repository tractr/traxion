import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { BaseUiComponent } from '../../base';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-input-password-ui',
  templateUrl: './input-password-ui.component.html',
  styleUrls: ['./input-password-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputPasswordUiComponent
  extends BaseUiComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @ViewChild('input') input!: ElementRef;

  value$ = new Subject<string>();

  showPassword = false;

  override prefixId = 'trxn-input-password-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Password';

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.input) this.input.nativeElement.value = value;
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
