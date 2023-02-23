import { Predicate } from './predicate';

export function not<S, T1 extends S>(
  predicate: Predicate<S, T1>,
): Predicate<S, Exclude<S, T1>> {
  return (value): value is Exclude<S, T1> => !predicate(value);
}
