import { OperatorFunction } from 'rxjs';
import { filter, map, scan } from 'rxjs/operators';

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
 * Emits on first array, even if it is empty.
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
        (acc, curr, index) => {
          // Get removed items
          const removed = acc.value.filter(
            (item) => !curr.some((item2) => comparator(item, item2)),
          );

          // Get added items
          const added = curr.filter(
            (item) => !acc.value.some((item2) => comparator(item, item2)),
          );

          // Reuse the old values to keep pointer equality when using a custom comparator.
          const notRemoved = acc.value.filter(
            (item) => !removed.some((item2) => comparator(item, item2)),
          );
          const value = [...notRemoved, ...added];

          return {
            value,
            added,
            removed,
            index,
          };
        },
        {
          value: [] as T[],
          added: [] as T[],
          removed: [] as T[],
          index: -1,
        },
      ),
      filter(
        (changes) =>
          changes.index === 0 ||
          changes.added.length > 0 ||
          changes.removed.length > 0,
      ),
      // Clone array to protect tracking from mutation
      map((changes) => ({
        value: [...changes.value],
        added: [...changes.added],
        removed: [...changes.removed],
      })),
    );
  };
}
