import { OperatorFunction } from 'rxjs';
import { filter, scan } from 'rxjs/operators';

/**
 * Object returned by the arrayChanges operator.
 */
export interface ArrayChanges<T> {
  value: T[];
  added: T[];
  removed: T[];
}

/**
 * Emits when the array changes.
 * Comparisons are done using the Array.includes method.
 * This does not with duplicate entries.
 *
 * Usage:
 *  - stream$.pipe(arrayChanges())
 *  - stream$.pipe(arrayChanges((a, b) => a.id === b.id))
 */
export function arrayChanges<T>(
  comparator: (first: T, second: T) => boolean = (first: T, second: T) =>
    first === second,
): OperatorFunction<T[], ArrayChanges<T>> {
  return function operator(source) {
    return source.pipe(
      scan(
        (acc, curr) => {
          // Get removed items
          const removed = acc.value.filter(
            (item) => !curr.some((item2) => comparator(item, item2)),
          );

          // Get added items
          const added = curr.filter(
            (item) => !acc.value.some((item2) => comparator(item, item2)),
          );

          // Clone list
          const value = [...curr];

          return {
            value,
            added,
            removed,
          };
        },
        {
          value: [] as T[],
          added: [] as T[],
          removed: [] as T[],
        },
      ),
      filter(
        (changes) => changes.added.length > 0 || changes.removed.length > 0,
      ),
    );
  };
}
