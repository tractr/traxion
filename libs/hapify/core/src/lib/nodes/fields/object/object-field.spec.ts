import { ObjectField } from './object-field';

describe('ObjectField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new ObjectField('test');
      expect(field).toBeInstanceOf(ObjectField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new ObjectField('test');
      expect(field.type).toBe('object');
      expect(field.subType).toBe('basic');
    });
  });
  describe('defaultValues', () => {
    it('should be undefined by default', () => {
      const field = new ObjectField('test');
      expect(field.defaultValue).toBeUndefined();
    });
    it('should set default values', () => {
      const field = new ObjectField('test');
      expect(
        field.setDefaultValue({
          test: 'test',
          other: 2,
        }),
      ).toBe(field); // Test chaining;
      expect(field.defaultValue).toStrictEqual({
        test: 'test',
        other: 2,
      });
    });
  });
});
