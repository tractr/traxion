/**
 * Helper that excludes undefined values from an array and force typescript to exclude undefined type from results
 */
export function definedValues<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export type ConstructorFunction<T> = new (...args: never[]) => T;

/**
 * Helpers that denotes if the value is an instance of the constructor and force typescript as an instance of this constructor.
 */
export function instanceOf<T>(
  constructor: ConstructorFunction<T>,
): (value: unknown) => value is T {
  return function filter(value: unknown): value is T {
    return value instanceof constructor;
  };
}
