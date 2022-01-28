import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';

@Component({
  selector: 'tractr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent implements AfterViewInit {
  @Output() submitted = new EventEmitter<Record<string, unknown>>();

  @Output() changed = new EventEmitter<Record<string, unknown>>();

  @Input() layout: NzFormLayoutType = 'horizontal';

  @Input() form!: FormGroup;

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((changes) =>
      this.changed.emit(changes as Record<string, unknown>),
    );
  }

  submit(): void {
    this.submitted.emit(this.form.value as Record<string, unknown>);
  }
}
