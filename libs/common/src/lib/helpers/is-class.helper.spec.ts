import { isClass } from './is-class.helper';

describe('isClass', () => {
  it('should return true if the value is a class', () => {
    class Test {}
    expect(isClass(Test)).toBe(true);
  });

  it('should return false if the value is not a class', () => {
    expect(isClass(null)).toBe(false);
    expect(isClass(undefined)).toBe(false);
    expect(isClass(true)).toBe(false);
    expect(isClass(false)).toBe(false);
    expect(isClass(0)).toBe(false);
    expect(isClass(1)).toBe(false);
    expect(isClass('')).toBe(false);
    expect(isClass('string')).toBe(false);
    expect(isClass({})).toBe(false);
    expect(isClass([])).toBe(false);
    expect(isClass(() => 1)).toBe(false);
  });
});
