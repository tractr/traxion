import { isConstraint } from './is-constraint';
import { BaseField } from '../base-types';

describe('isConstraint', () => {
  describe('with a valid field', () => {
    it('should return true if the field has a constraint of the given name that is truthy', () => {
      const field: BaseField<'string', { a: boolean; c?: string }> = {
        type: 'string',
        name: 'test',
        pluralName: 'tests',
        a: true,
      };

      expect(isConstraint(field, 'a')).toBeTruthy();
    });

    it('should return false if the field does not have a constraint of the given name', () => {
      const field: BaseField<'string', { a: boolean; c?: string }> = {
        type: 'string',
        name: 'test',
        pluralName: 'tests',
        a: true,
      };

      expect(isConstraint(field, 'b')).toBeFalsy();
    });

    it('should return true if the field has a constraint of the given name that is falsy', () => {
      const field: BaseField<'string', { a: boolean; c?: string }> = {
        type: 'string',
        name: 'test',
        pluralName: 'tests',
        a: false,
      };

      expect(isConstraint(field, 'a')).toBeFalsy();
    });
  });
});
