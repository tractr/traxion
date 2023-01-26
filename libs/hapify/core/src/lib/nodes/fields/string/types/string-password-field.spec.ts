import { StringPasswordField } from './string-password-field';

describe('StringPasswordField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new StringPasswordField('test');
      expect(field).toBeInstanceOf(StringPasswordField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new StringPasswordField('test');
      expect(field.type).toBe('string');
      expect(field.subType).toBe('password');
    });
  });
  describe('validationRegex', () => {
    it('should be undefined by default', () => {
      const field = new StringPasswordField('test');
      expect(field.validationRegex).toBeUndefined();
    });
    it('should set validation regex', () => {
      const field = new StringPasswordField('test');
      field.setValidationRegex('test');
      expect(field.validationRegex).toBe('test');
    });
  });
});
