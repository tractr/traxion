/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tractr-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
})
export class CheckboxComponent implements OnInit {
  protected unsubscribe$: Subject<void> = new Subject<void>();

  @Input() delayed = 200;

  @Input() checkedValue: any;

  /** Value */
  private valueState: boolean | undefined;

  valueChanged$: Subject<boolean | undefined> = new Subject<
    boolean | undefined
  >();

  @Output() valueChanged = new EventEmitter<boolean | undefined>();

  @Input()
  get value() {
    return this.valueState;
  }

  set value(value: boolean | undefined) {
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
