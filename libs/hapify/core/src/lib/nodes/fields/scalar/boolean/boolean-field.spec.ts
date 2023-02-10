import { BooleanField } from './boolean-field';

describe('BooleanField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new BooleanField('test');
      expect(field).toBeInstanceOf(BooleanField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new BooleanField('test');
      expect(field.type).toBe('boolean');
      expect(field.subType).toBe('basic');
    });
  });

  describe('defaultValue', () => {
    it('should be undefined by default', () => {
      const field = new BooleanField('test');
      expect(field.defaultValue).toBeUndefined();
    });
    it('should be set', () => {
      const field = new BooleanField('test');
      expect(field.setDefaultValue(true)).toBe(field); // Test chaining;
      expect(field.defaultValue).toBe(true);
    });
  });
});
