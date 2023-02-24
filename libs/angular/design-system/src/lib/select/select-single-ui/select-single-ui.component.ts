import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, ReplaySubject, Subject, takeUntil } from 'rxjs';

import { BaseFormControlComponent } from '../../base';
import { SelectOptionInterface } from '../../interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-select-single-ui',
  templateUrl: './select-single-ui.component.html',
  styleUrls: ['./select-single-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class SelectSingleUiComponent
  extends BaseFormControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @ViewChild('select') select!: ElementRef;

  value$ = new Subject<string | undefined>();

  selected$ = new BehaviorSubject<SelectOptionInterface | undefined>(undefined);

  options: SelectOptionInterface[] = [];

  override prefixId = 'trxn-select-single-ui-';

  override ngOnInit(): void {
    super.ngOnInit();

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.select) this.select.nativeElement.value = value;
    });

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((selected) => {
      this.selected$.next(
        this.options.find((option) => option.value === selected),
      );
    });
  }

  override onChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value$.next(value === '' ? undefined : value);
  };
}
