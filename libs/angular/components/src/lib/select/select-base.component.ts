import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { SelectOptionInterface } from './interfaces/select.interface';

@Component({
  selector: 'tractr-select-base',
  template: '',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class SelectBaseComponent<Type extends any>
  implements OnInit, OnDestroy
{
  protected unsubscribe$: Subject<void> = new Subject<void>();

  @Input() options: SelectOptionInterface<Type>[] = [];

  @Input() delayed = 200;

  /** Id */
  private idState: string | number | undefined;

  idChanged$: Subject<string | number | undefined> = new Subject<
    string | number | undefined
  >();

  get id() {
    return this.idState;
  }

  set id(id: string | number | undefined) {
    this.idState = id;
    this.idChanged$.next(id);
  }
  /** /Id */

  /** Value */
  private valueState: SelectOptionInterface<Type> | undefined;

  @Output() valueChanged = new EventEmitter<
    SelectOptionInterface<Type> | undefined
  >();

  @Input()
  get value() {
    return this.valueState;
  }

  set value(value: SelectOptionInterface<Type> | undefined) {
    this.valueState = value;
    this.valueChanged.emit(value);
    this.idState = this.valueState?.id;
  }
  /** /Value */

  ngOnInit() {
    // Emit value change only if not changed after a delay
    this.idChanged$
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(this.delayed),
        distinctUntilChanged(),
      )
      .subscribe((id) => {
        this.setValueFromId(id);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  setValueFromId(id: string | number | undefined): void {
    if (!id) this.value = undefined;

    this.value = this.options.find((option) => option.id === id);
  }
}
