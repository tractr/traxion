import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';

@Component({
  selector: 'tractr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent implements OnInit {
  @Output() submitted = new EventEmitter<Record<string, unknown>>();

  @Output() changed = new EventEmitter<Record<string, unknown>>();

  @Input() layout: NzFormLayoutType = 'horizontal';

  @Input() form!: FormGroup;

  ngOnInit(): void {
    this.form.valueChanges.subscribe((changes) => this.changed.emit(changes));
  }

  submit(): void {
    this.submitted.emit(this.controlsToObject(this.form.controls));
  }

  controlsToObject(
    controls: Record<string, AbstractControl>,
  ): Record<string, unknown> {
    const object: Record<string, unknown> = {};

    Object.entries(controls).forEach(([name, control]) => {
      if (control instanceof FormControl) {
        object[name] = control.value;
      }
    });

    return object;
  }
}
