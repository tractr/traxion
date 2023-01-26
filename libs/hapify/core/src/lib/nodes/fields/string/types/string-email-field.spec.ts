import { StringEmailField } from './string-email-field';

describe('StringEmailField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new StringEmailField('test');
      expect(field).toBeInstanceOf(StringEmailField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new StringEmailField('test');
      expect(field.type).toBe('string');
      expect(field.subType).toBe('email');
    });
  });
});
