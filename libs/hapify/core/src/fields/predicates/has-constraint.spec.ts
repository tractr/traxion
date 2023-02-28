import { hasConstraint } from './has-constraint';
import { BaseField } from '..';

describe('hasConstraint', () => {
  const defaultField = { type: 'string', name: 'a', pluralName: 'as', a: true };

  it('should return `true` for existing constraints', () => {
    expect(hasConstraint(defaultField, 'a')).toBe(true);
  });

  it('should return `false` for non-existing immutable constraints', () => {
    expect(hasConstraint(defaultField, 'b')).toBe(false);
  });

  it('should take mutable fields into consideration', () => {
    const field: BaseField = { ...defaultField };
    field.c = 'c';
    expect(hasConstraint(field, 'c')).toBe(true);
  });

  it('should return true when mutating a constraint', () => {
    const field = { ...defaultField };
    field.a = false;
    expect(hasConstraint(field, 'a')).toBe(true);
  });
});
