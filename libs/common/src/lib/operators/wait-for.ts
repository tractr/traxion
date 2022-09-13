import { merge, Observable, OperatorFunction } from 'rxjs';
import { buffer, mergeMap, skipUntil, take } from 'rxjs/operators';

/**
 * This operator will buffer the values from the source until the given observable emits.
 * Once the given observable emits, it will emit the buffered values at once and continue emitting upcoming values from the source.
 * You can limit the number of buffered values by passing a number as the second argument.
 *
 * @param event$ The event that will open the stream
 * @param limit The number of events (last events) to replay once the stream is open
 */
export function waitFor<T>(
  event$: Observable<unknown>,
  limit?: number,
): OperatorFunction<T, T> {
  return function operator(source$) {
    const buffer$ = source$.pipe(buffer(event$), take(1));

    return merge(
      buffer$.pipe(
        mergeMap((values) =>
          typeof limit === 'number' ? values.slice(-limit) : values,
        ),
      ),
      source$.pipe(skipUntil(event$)),
    );
  };
}
