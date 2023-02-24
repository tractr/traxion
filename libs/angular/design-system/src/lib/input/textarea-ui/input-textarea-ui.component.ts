import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { BaseFormControlComponent } from '../../base';

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
  implements OnInit
{
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  @Input() placeholder?: string;

  value$ = new Subject<string>();

  override prefixId = 'trxn-input-textarea-ui-';

  override ngOnInit(): void {
    super.ngOnInit();

    this.placeholder = this.placeholder ?? 'Textarea';

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.textarea) this.textarea.nativeElement.value = value;
    });
  }
}
