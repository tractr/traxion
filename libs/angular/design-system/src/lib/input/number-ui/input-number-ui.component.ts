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
  selector: 'trxn-input-number-ui',
  templateUrl: './input-number-ui.component.html',
  styleUrls: ['./input-number-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputNumberUiComponent
  extends BaseUiComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @ViewChild('input') input!: ElementRef;

  value$ = new Subject<number | undefined>();

  override prefixId = 'trxn-input-number-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Number';

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.input) this.input.nativeElement.value = value;
    });
  }

  override onChange = (event: Event) => {
    const value = parseInt((event.target as HTMLInputElement).value, 10);

    this.value$.next(Number.isNaN(value) ? undefined : value);
  };
}
