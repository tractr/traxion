import { not } from './not';
import { Predicate } from './predicate';

describe('not', () => {
  it('should return a function that negates the original predicate', () => {
    const isEven: Predicate<number, number> = (n: number): n is number =>
      n % 2 === 0;
    const isOdd = not(isEven);

    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(4)).toBe(false);
    expect(isOdd(5)).toBe(true);
  });

  it('should return a function with a correctly typed output', () => {
    const isEven: Predicate<number, number> = (n: number): n is number =>
      n % 2 === 0;
    const isOdd = not(isEven);

    // The output type should be `Predicate<number, number | undefined>`
    // since the input type is `Predicate<number, number>`
    const outputTypeTest: Predicate<number, never> = isOdd;

    expect(outputTypeTest).toBeDefined();
  });
});
