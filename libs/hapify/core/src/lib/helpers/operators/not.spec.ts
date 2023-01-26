import { StringBasicField } from '../../nodes';
import { isBasicString, isNumber } from '../predicates';
import { not } from './not';

describe('not', () => {
  it('should return true when predicate is false', () => {
    const predicate = not(isNumber);
    expect(predicate(new StringBasicField('test'))).toBe(true);
  });

  it('should return false when predicate is true', () => {
    const predicate = not(isBasicString);
    expect(predicate(new StringBasicField('test'))).toBe(false);
  });
});
