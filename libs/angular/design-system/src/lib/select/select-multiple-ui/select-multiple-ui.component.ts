import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { BaseSelectComponent } from '../../base';
import { SelectOptionInterface } from '../../interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-select-multiple-ui',
  templateUrl: './select-multiple-ui.component.html',
  styleUrls: ['./select-multiple-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class SelectMultipleUiComponent
  extends BaseSelectComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  value$ = new Subject<string[]>();

  selected$ = new BehaviorSubject<SelectOptionInterface[]>([]);

  override prefixId = 'trxn-select-multiple-ui-';

  override ngOnInit(): void {
    super.ngOnInit();

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((selected) => {
      this.selected$.next(
        selected
          .map((value) => this.options.find((option) => option.value === value))
          .filter(
            (optionSelected): optionSelected is SelectOptionInterface =>
              !!optionSelected,
          ),
      );
    });
  }

  override onChange = (event: Event) => {
    const { selectedOptions } = event.target as HTMLSelectElement;

    const valuesSelected: string[] = [];
    for (let i = 0; i < selectedOptions.length; i += 1) {
      const option = selectedOptions.item(i);
      if (option) valuesSelected.push(option.value);
    }

    this.value$.next(valuesSelected);
  };
}
