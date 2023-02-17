/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnDestroy } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseInputComponent implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  errors$ = new BehaviorSubject<ValidationErrors | null>(null);

  disabled = false;

  @Input() id?: string = new Date().getTime().toString();

  @Input() label?: string;

  @Input() placeholder?: string;

  prefixId = '';

  onChange: (value: any) => void = () => {};

  onTouched: () => void = () => {};

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.errors$.complete();
  }
}
