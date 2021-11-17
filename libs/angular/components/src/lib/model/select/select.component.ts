import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { SelectOptionInterface } from '../../select/interfaces/select.interface';

@Component({
  selector: 'tractr-model-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class ModelSelectComponent implements OnInit, OnDestroy {
  protected unsubscribe$: Subject<void> = new Subject<void>();

  @Input() idField = 'id';

  @Input() labelField = 'name';

  @Input() delayed = 200;

  /** Value */
  private valueState:
    | Record<string, unknown>
    | Record<string, unknown>[]
    | undefined;

  private valueSubject$ = new Subject<
    Record<string, unknown> | Record<string, unknown>[] | undefined
  >();

  @Output() valueChanged = new EventEmitter<
    Record<string, unknown> | Record<string, unknown>[] | undefined
  >();

  @Input()
  get value(): Record<string, unknown> | Record<string, unknown>[] | undefined {
    return this.valueState;
  }

  set value(
    value: Record<string, unknown> | Record<string, unknown>[] | undefined,
  ) {
    this.valueState = value;
    this.valueChanged.emit(this.valueState);

    if (this.valueState) {
      this.stateOption = this.modelToOption(this.valueState);
    } else {
      this.stateOption = undefined;
    }
  }
  /** /Value */

  @Input() getList!: () => Promise<Record<string, unknown>[]>;

  stateOption?:
    | SelectOptionInterface<Record<string, unknown>>
    | SelectOptionInterface<Record<string, unknown>>[];

  options: SelectOptionInterface<Record<string, unknown>>[] = [];

  async ngOnInit() {
    this.options = this.modelToOption(
      await this.getList(),
    ) as SelectOptionInterface<Record<string, unknown>>[];

    this.valueSubject$
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged((prev, curr) => {
          if (!prev && !curr) return true;

          if (Array.isArray(prev) && Array.isArray(curr)) {
            return (
              prev.length === curr.length &&
              curr.every((modelCurr) =>
                prev.some(
                  (modelPrev) =>
                    modelCurr?.[this.idField] === modelPrev?.[this.idField],
                ),
              )
            );
          }

          if (!Array.isArray(prev) && !Array.isArray(curr)) {
            return prev?.[this.idField] === curr?.[this.idField];
          }

          return false;
        }),
      )
      .subscribe((value) => {
        this.value = value;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  modelToOption(
    model: Record<string, unknown> | Record<string, unknown>[] | undefined,
  ):
    | SelectOptionInterface<Record<string, unknown>>
    | SelectOptionInterface<Record<string, unknown>>[]
    | undefined {
    const parse = (
      m: Record<string, unknown>,
    ): SelectOptionInterface<Record<string, unknown>> => ({
      id: (m?.[this.idField] as string | number) || 'id',
      label: (m?.[this.labelField] as string) || 'name',
      value: m,
    });

    if (model) {
      if (Array.isArray(model)) {
        return model.map((m) => parse(m));
      }

      return parse(model);
    }

    return undefined;
  }

  setValue(
    option:
      | SelectOptionInterface<unknown>
      | SelectOptionInterface<unknown>[]
      | undefined,
  ): void {
    this.valueSubject$.next(this.getModelFromOption(option));
  }

  getModelFromOption(
    option:
      | SelectOptionInterface<unknown>
      | SelectOptionInterface<unknown>[]
      | undefined,
  ): Record<string, unknown> | Record<string, unknown>[] | undefined {
    if (option) {
      if (Array.isArray(option)) {
        return option
          .map((o) => o.value)
          .filter((model): model is Record<string, unknown> => !!model);
      }

      return option.value as Record<string, unknown>;
    }

    return undefined;
  }
}
