import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'tractr-form-input-base',
  template: '',
})
export abstract class InputBaseComponent<Type extends string | number>
  implements OnInit, OnDestroy
{
  protected unsubscribe$: Subject<void> = new Subject<void>();

  @Input() delayed = 200;

  /** Value */
  private valueState: Type | undefined;

  @Output() valueChanged = new EventEmitter<Type | undefined>();

  valueChanged$: Subject<Type | undefined> = new Subject<Type | undefined>();

  @Input()
  get value() {
    return this.valueState;
  }

  set value(value: Type | undefined) {
    this.valueState = value;
    this.valueChanged$.next(value);
  }
  /** /Value */

  ngOnInit() {
    // Emit value change only if not changed after a delay
    this.valueChanged$
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(this.delayed),
        distinctUntilChanged(),
        map((value) => this.parse(value)),
      )
      .subscribe((value) => {
        this.valueChanged.emit(value);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  parse(v: Type | undefined): Type | undefined {
    return v || undefined;
  }
}
