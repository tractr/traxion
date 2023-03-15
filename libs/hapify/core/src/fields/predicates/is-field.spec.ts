import { isField } from './is-field';

describe('isField', () => {
  it('should return true with valid props', () => {
    const field = { type: 'text', name: 'hello' };
    expect(isField(field)).toBe(true);
  });

  it('should return false with invalid or missing props', () => {
    expect(isField(1234)).toBe(false);
    expect(isField(null)).toBe(false);
    expect(isField({ type: 'text' })).toBe(false);
    expect(isField({ name: 'hello' })).toBe(false);
  });
});
