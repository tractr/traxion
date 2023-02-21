import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
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

import { BaseFormControlComponent, BaseInputTextComponent } from '../../base';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-input-textarea-ui',
  templateUrl: './input-textarea-ui.component.html',
  styleUrls: ['./input-textarea-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputTextareaUiComponent
  extends BaseFormControlComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @ViewChild('textarea') input!: ElementRef<HTMLTextAreaElement>;

  @Input() placeholder?: string;

  value$ = new Subject<string>();

  override prefixId = 'trxn-input-textarea-ui-';

  override ngOnInit(): void {
    super.ngOnInit();

    this.placeholder = this.placeholder ?? 'Textarea';

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.input) this.input.nativeElement.value = value;
    });
  }
}
