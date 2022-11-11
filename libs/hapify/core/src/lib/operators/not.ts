import { Predicate } from '../interfaces';

export function not<S, T1 extends S>(
  predicate: Predicate<S, T1>,
): Predicate<S, S> {
  return (value): value is S => !predicate(value);
}
