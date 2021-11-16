import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tractr-date-picker-base',
  template: '',
})
export abstract class DatePickerBaseComponent implements OnInit, OnDestroy {
  protected unsubscribe$: Subject<void> = new Subject<void>();

  @Input() placeholder = '';

  @Input() delayed = 200;

  /** Value */
  private valueState: Date | undefined;

  @Output() valueChanged = new EventEmitter<Date | undefined>();

  valueChanged$: Subject<Date | undefined> = new Subject<Date | undefined>();

  @Input()
  get value() {
    return this.valueState;
  }

  set value(value: Date | undefined) {
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
      )
      .subscribe((value) => {
        this.valueChanged.emit(value);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
