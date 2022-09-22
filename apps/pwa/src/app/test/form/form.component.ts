import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tractr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  form = this.formBuilder.group({
    name: ['', [Validators.required.bind(this)]],
    email: ['', [Validators.required.bind(this)]],
    city: ['', [Validators.required.bind(this)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  displayForm() {
    // console.log(this.form);
  }
}
