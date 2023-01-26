import { StringBasicField } from '../../nodes';
import { isBasicString, isEnum, isNumber } from '../predicates';
import { or } from './or';

describe('or', () => {
  describe('with 2 predicates', () => {
    describe('with 2 predicates', () => {
      it('should return true if one predicate is true', () => {
        const predicate = or(isNumber, isBasicString);
        expect(predicate(new StringBasicField('test'))).toBe(true);
      });

      it('should return false if all predicates are false', () => {
        const predicate = or(isNumber, isEnum);
        expect(predicate(new StringBasicField('test'))).toBe(false);
      });
    });
  });
  describe('with 10 predicates', () => {
    it('should return true if one predicate is true', () => {
      const predicate = or(
        isNumber,
        isNumber,
        isNumber,
        isNumber,
        isNumber,
        isEnum,
        isEnum,
        isEnum,
        isEnum,
        isBasicString,
      );
      expect(predicate(new StringBasicField('test'))).toBe(true);
    });

    it('should return false if all predicates are false', () => {
      const predicate = or(
        isNumber,
        isNumber,
        isNumber,
        isNumber,
        isNumber,
        isEnum,
        isEnum,
        isEnum,
        isEnum,
        isEnum,
      );
      expect(predicate(new StringBasicField('test'))).toBe(false);
    });
  });
});
