import { ObjectField, StringBasicField } from '../../../../nodes';
import { isObject } from './object';

describe('isObject', () => {
  it('should return true', () => {
    expect(isObject(new ObjectField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isObject(new StringBasicField('test'))).toBe(false);
  });
});
