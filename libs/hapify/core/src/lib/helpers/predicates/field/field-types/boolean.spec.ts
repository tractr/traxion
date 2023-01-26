import { BooleanField, StringBasicField } from '../../../../nodes';
import { isBoolean } from './boolean';

describe('isBoolean', () => {
  it('should return true', () => {
    expect(isBoolean(new BooleanField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isBoolean(new StringBasicField('test'))).toBe(false);
  });
});
