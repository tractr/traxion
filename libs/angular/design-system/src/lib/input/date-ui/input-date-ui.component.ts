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
  selector: 'trxn-input-date-ui',
  templateUrl: './input-date-ui.component.html',
  styleUrls: ['./input-date-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputDateUiComponent
  extends BaseUiComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @ViewChild('input') input!: ElementRef;

  value$ = new Subject<string>();

  override prefixId = 'trxn-input-date-ui-';

  override ngOnInit(): void {
    super.ngOnInit();

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.input) this.input.nativeElement.value = value;
    });
  }
}
