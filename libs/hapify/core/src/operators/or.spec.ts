import { or } from './or';
import { Predicate } from './predicate';

// Define some example predicates for testing
const isNumber: Predicate<unknown, number> = (
  input: unknown,
): input is number => typeof input === 'number';
const isString: Predicate<unknown, string> = (
  input: unknown,
): input is string => typeof input === 'string';
const isBoolean: Predicate<unknown, boolean> = (
  input: unknown,
): input is boolean => typeof input === 'boolean';

describe('or', () => {
  describe('when given one predicate', () => {
    it('returns a new predicate that returns true if at least one predicate is true', () => {
      const orPredicate = or(isNumber);
      expect(orPredicate(1)).toBe(true);
      expect(orPredicate('foo')).toBe(false);
      expect(orPredicate(true)).toBe(false);
    });
  });

  describe('when given multiple predicates', () => {
    it('returns a new predicate that returns true if at least one predicate is true', () => {
      const orPredicate = or(isNumber, isString, isBoolean);
      expect(orPredicate(1)).toBe(true);
      expect(orPredicate('foo')).toBe(true);
      expect(orPredicate(true)).toBe(true);
      expect(orPredicate([])).toBe(false);
    });

    it('should typecheck', () => {
      const orPredicate = or(isNumber, isString, isBoolean);
      const input = 1 as number | string | boolean | null;
      if (orPredicate(input)) {
        const output: number | string | boolean = input; // Typechecks!
        expect(output).toBe(1);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const test: null = input; // Typechecks!
        fail('Predicate failed!');
      }
    });
  });
});
