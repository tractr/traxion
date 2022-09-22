/* eslint-disable no-unused-expressions */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
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
  ],
})
export class InputUiComponent implements ControlValueAccessor {
  @Input() placeholder?: string;
  @Input() error?: unknown;

  public input = new FormControl();

  public onTouched!: () => void;

  writeValue(value: string): void {
    value && this.input.setValue(value);
  }

  registerOnChange(fn: (value: string | null) => void) {
    this.input.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.input.disable() : this.input.enable();
  }
}
