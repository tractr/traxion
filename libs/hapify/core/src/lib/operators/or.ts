import { Predicate } from '../interfaces/predicate';

export function or<S, T1 extends S>(
  predicate1: Predicate<S, T1>,
): Predicate<S, T1>;
export function or<S, T1 extends S, T2 extends S>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
): Predicate<S, T1 | T2>;
export function or<S, T1 extends S, T2 extends S, T3 extends S>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
): Predicate<S, T1 | T2 | T3>;
export function or<S, T1 extends S, T2 extends S, T3 extends S, T4 extends S>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
  predicate4: Predicate<S, T4>,
): Predicate<S, T1 | T2 | T3 | T4>;
export function or<
  S,
  T1 extends S,
  T2 extends S,
  T3 extends S,
  T4 extends S,
  T5 extends S,
>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
  predicate4: Predicate<S, T4>,
  predicate5: Predicate<S, T5>,
): Predicate<S, T1 | T2 | T3 | T4 | T5>;
export function or<
  S,
  T1 extends S,
  T2 extends S,
  T3 extends S,
  T4 extends S,
  T5 extends S,
  T6 extends S,
>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
  predicate4: Predicate<S, T4>,
  predicate5: Predicate<S, T5>,
  predicate6: Predicate<S, T6>,
): Predicate<S, T1 | T2 | T3 | T4 | T5 | T6>;
export function or<
  S,
  T1 extends S,
  T2 extends S,
  T3 extends S,
  T4 extends S,
  T5 extends S,
  T6 extends S,
  T7 extends S,
>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
  predicate4: Predicate<S, T4>,
  predicate5: Predicate<S, T5>,
  predicate6: Predicate<S, T6>,
  predicate7: Predicate<S, T7>,
): Predicate<S, T1 | T2 | T3 | T4 | T5 | T6 | T7>;
export function or<
  S,
  T1 extends S,
  T2 extends S,
  T3 extends S,
  T4 extends S,
  T5 extends S,
  T6 extends S,
  T7 extends S,
  T8 extends S,
>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
  predicate4: Predicate<S, T4>,
  predicate5: Predicate<S, T5>,
  predicate6: Predicate<S, T6>,
  predicate7: Predicate<S, T7>,
  predicate8: Predicate<S, T8>,
): Predicate<S, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
export function or<
  S,
  T1 extends S,
  T2 extends S,
  T3 extends S,
  T4 extends S,
  T5 extends S,
  T6 extends S,
  T7 extends S,
  T8 extends S,
  T9 extends S,
>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
  predicate4: Predicate<S, T4>,
  predicate5: Predicate<S, T5>,
  predicate6: Predicate<S, T6>,
  predicate7: Predicate<S, T7>,
  predicate8: Predicate<S, T8>,
  predicate9: Predicate<S, T9>,
): Predicate<S, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
export function or<
  S,
  T1 extends S,
  T2 extends S,
  T3 extends S,
  T4 extends S,
  T5 extends S,
  T6 extends S,
  T7 extends S,
  T8 extends S,
  T9 extends S,
  T10 extends S,
>(
  predicate1: Predicate<S, T1>,
  predicate2: Predicate<S, T2>,
  predicate3: Predicate<S, T3>,
  predicate4: Predicate<S, T4>,
  predicate5: Predicate<S, T5>,
  predicate6: Predicate<S, T6>,
  predicate7: Predicate<S, T7>,
  predicate8: Predicate<S, T8>,
  predicate9: Predicate<S, T9>,
  predicate10: Predicate<S, T10>,
): Predicate<S, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
export function or<
  S,
  T1 extends S,
  T2 extends S,
  T3 extends S,
  T4 extends S,
  T5 extends S,
  T6 extends S,
  T7 extends S,
  T8 extends S,
  T9 extends S,
  T10 extends S,
>(
  predicate1: Predicate<S, T1>,
  predicate2?: Predicate<S, T2>,
  predicate3?: Predicate<S, T3>,
  predicate4?: Predicate<S, T4>,
  predicate5?: Predicate<S, T5>,
  predicate6?: Predicate<S, T6>,
  predicate7?: Predicate<S, T7>,
  predicate8?: Predicate<S, T8>,
  predicate9?: Predicate<S, T9>,
  predicate10?: Predicate<S, T10>,
): Predicate<S, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10> {
  return (value): value is T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 => {
    return (
      predicate1(value) ||
      (!!predicate2 && predicate2(value)) ||
      (!!predicate3 && predicate3(value)) ||
      (!!predicate4 && predicate4(value)) ||
      (!!predicate5 && predicate5(value)) ||
      (!!predicate6 && predicate6(value)) ||
      (!!predicate7 && predicate7(value)) ||
      (!!predicate8 && predicate8(value)) ||
      (!!predicate9 && predicate9(value)) ||
      (!!predicate10 && predicate10(value))
    );
  };
}
