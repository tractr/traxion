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
  selector: 'trxn-input-text-ui',
  templateUrl: './input-text-ui.component.html',
  styleUrls: ['./input-text-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputTextUiComponent
  extends BaseUiComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @ViewChild('input') input!: ElementRef;

  value$ = new Subject<string>();

  override prefixId = 'trxn-input-text-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Text';

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.input) this.input.nativeElement.value = value;
    });
  }
}
