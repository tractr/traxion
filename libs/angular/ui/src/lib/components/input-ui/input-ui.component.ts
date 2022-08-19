/* eslint-disable no-unused-expressions */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'tractr-input-ui',
  templateUrl: './input-ui.component.html',
  styleUrls: ['./input-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUiComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputUiComponent),
      multi: true,
    },
  ],
})
export class InputUiComponent implements ControlValueAccessor, Validator {
  @Input() placeholder?: string;

  public input = new FormControl();
  public onTouched!: () => void;

  writeValue(value: string): void {
    value && this.input.setValue(value);
  }

  registerOnChange(fn: (value: string) => void) {
    this.input.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.input.disable() : this.input.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.input.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'input fields are invalid',
          },
        };
  }
}
