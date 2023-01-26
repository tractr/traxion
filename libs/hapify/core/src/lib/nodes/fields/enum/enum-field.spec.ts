import { EnumField } from './enum-field';

describe('EnumField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new EnumField('test');
      expect(field).toBeInstanceOf(EnumField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new EnumField('test');
      expect(field.type).toBe('enum');
      expect(field.subType).toBe('basic');
    });
  });
  describe('defaultValues', () => {
    it('should be undefined by default', () => {
      const field = new EnumField('test');
      expect(field.defaultValue).toBeUndefined();
    });
    it('should set default values', () => {
      const field = new EnumField('test');
      field.addValue('test');
      field.setDefaultValue('test');
      expect(field.defaultValue).toBe('test');
    });
    it('should throw an error if the value is not in the enum', () => {
      const field = new EnumField('test');
      expect(() => {
        field.setDefaultValue('test');
      }).toThrowError('Value "test" is not in the enum');
    });
  });
  describe('values', () => {
    it('should be empty by default', () => {
      const field = new EnumField('test');
      expect(field.values).toStrictEqual([]);
    });
    it('should add values', () => {
      const field = new EnumField('test');
      field.addValue('test');
      expect(field.values).toStrictEqual(['test']);
    });
    it('should remove values', () => {
      const field = new EnumField('test');
      field.addValue('test');
      field.removeValue('test');
      expect(field.values).toStrictEqual([]);
    });
  });
});
