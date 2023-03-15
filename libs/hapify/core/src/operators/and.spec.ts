import { and } from './and';

describe('and', () => {
  it('returns true if all predicates pass', () => {
    const predicate = and(
      (x: string): x is string => true,
      (x: string): x is string => true,
    );
    expect(predicate('hello')).toBe(true);
  });

  it('returns false if any predicate fails', () => {
    const predicate = and(
      (x: string): x is string => true,
      (x: string): x is string => false,
    );
    expect(predicate('world')).toBe(false);
  });

  it('supports up to 10 predicates', () => {
    const predicate = and(
      (x: unknown): x is number => typeof x === 'number',
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
      (x: unknown): x is number => true,
    );
    expect(predicate(6)).toBe(true);
    expect(predicate('a')).toBe(false);
  });

  it('correctly narrows the type of the input value', () => {
    const predicate = and((x): x is string => typeof x === 'string');
    const input: string | number = 'hello';
    if (predicate(input)) {
      const output: string = input; // Typechecks!
      expect(output).toBe('hello');
    } else {
      fail('Predicate failed!');
    }
  });
});
