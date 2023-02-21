import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, Observer, Subject, takeUntil } from 'rxjs';

import { nullValidator } from './base.validator';

@Component({
  template: '',
})
export abstract class BaseFormControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  protected readonly unsubscribe$ = new Subject<void>();

  protected readonly errors$ = new BehaviorSubject<ValidationErrors | null>(
    null,
  );

  @Input() id?: string = new Date().getTime().toString();

  @Input() label?: string;

  prefixId = '';

  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract value$: Subject<any>;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public ngControl?: NgControl,
  ) {
    // eslint-disable-next-line no-param-reassign
    if (ngControl) ngControl.valueAccessor = this;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.errors$.complete();
  }

  ngOnInit(): void {
    const parentControl = this.ngControl?.control;
    if (!parentControl) return;

    parentControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });

    parentControl.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.errors$.next(parentControl.errors);
        this.changeDetectorRef.markForCheck();
      });

    parentControl.setValidators([
      parentControl.validator || nullValidator,
      this.validate.bind(this),
    ]);
    parentControl.updateValueAndValidity();
  }

  onChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value$.next(value);
  };

  writeValue(value: unknown): void {
    this.value$.next(value);
  }

  registerOnChange(fn: Observer<unknown>) {
    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(): ValidationErrors | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};
}
