import { StringBasicField } from '../../nodes';
import { isBasicString, isNumber, isString } from '../predicates';
import { and } from './and';

describe('and', () => {
  describe('with 2 predicates', () => {
    it('should return true if all predicates are true', () => {
      const predicate = and(isString, isBasicString);
      expect(predicate(new StringBasicField('test'))).toBe(true);
    });

    it('should return false if one predicate is false', () => {
      const predicate = and(isNumber, isBasicString);
      expect(predicate(new StringBasicField('test'))).toBe(false);
    });
  });

  describe('with 10 predicates', () => {
    it('should return true if all predicates are true', () => {
      const predicate = and(
        isString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
      );
      expect(predicate(new StringBasicField('test'))).toBe(true);
    });

    it('should return false if one predicate is false', () => {
      const predicate = and(
        isString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isBasicString,
        isNumber,
      );
      expect(predicate(new StringBasicField('test'))).toBe(false);
    });
  });
});
