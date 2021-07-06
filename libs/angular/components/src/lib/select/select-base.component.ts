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

type IdType = string | number;

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
  private idState: IdType | IdType[] | undefined;

  idChanged$ = new Subject<IdType | IdType[] | undefined>();

  get id() {
    return this.idState;
  }

  set id(id: IdType | IdType[] | undefined) {
    this.idState = id;
    this.idChanged$.next(id);
  }
  /** /Id */

  /** Value */
  private valueState:
    | SelectOptionInterface<Type>
    | SelectOptionInterface<Type>[]
    | undefined;

  @Output() valueChanged = new EventEmitter<
    SelectOptionInterface<Type> | SelectOptionInterface<Type>[] | undefined
  >();

  @Input()
  get value() {
    return this.valueState;
  }

  set value(
    value:
      | SelectOptionInterface<Type>
      | SelectOptionInterface<Type>[]
      | undefined,
  ) {
    this.valueState = value;
    this.valueChanged.emit(value);
    this.idState = this.extractId(this.valueState);
  }
  /** /Value */

  ngOnInit() {
    // Emit value change only if not changed after a delay
    this.idChanged$
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(this.delayed),
        distinctUntilChanged((prev, curr) => {
          if (!prev && !curr) return true;

          if (Array.isArray(prev) && Array.isArray(curr)) {
            return (
              prev.length === curr.length &&
              curr.every((idCurr) => prev.some((idPrev) => idPrev === idCurr))
            );
          }

          if (!Array.isArray(prev) && !Array.isArray(curr)) {
            return prev === curr;
          }

          return false;
        }),
      )
      .subscribe((id) => {
        this.setValueFromId(id);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  setValueFromId(id: IdType | IdType[] | undefined): void {
    if (!id) this.value = undefined;
    else {
      const find = (currId: IdType) =>
        this.options.find((option) => option.id === currId);

      this.value = Array.isArray(id)
        ? id
            .map((i) => find(i))
            ?.filter((i): i is SelectOptionInterface<Type> => !!i)
        : find(id);
    }
  }

  extractId(
    value:
      | SelectOptionInterface<Type>
      | SelectOptionInterface<Type>[]
      | undefined,
  ): IdType | IdType[] | undefined {
    if (!value) return undefined;

    if (Array.isArray(value)) {
      return value.map((v) => v.id);
    }
    return value.id;
  }
}
