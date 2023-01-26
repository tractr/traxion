import { NumberLatitudeField } from './number-latitude-field';

describe('NumberLatitudeField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new NumberLatitudeField('test');
      expect(field).toBeInstanceOf(NumberLatitudeField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new NumberLatitudeField('test');
      expect(field.type).toBe('number');
      expect(field.subType).toBe('latitude');
    });
  });
  describe('min', () => {
    it('should be -90 by default', () => {
      const field = new NumberLatitudeField('test');
      expect(field.min).toBe(-90);
    });
    it('should not be lower than -90', () => {
      const field = new NumberLatitudeField('test');
      expect(field.setMin(-91)).toBe(field); // Test chaining;
      expect(field.min).toBe(-90);
    });
  });
  describe('max', () => {
    it('should be 90 by default', () => {
      const field = new NumberLatitudeField('test');
      expect(field.max).toBe(90);
    });
    it('should not be higher than 90', () => {
      const field = new NumberLatitudeField('test');
      expect(field.setMax(91)).toBe(field); // Test chaining;
      expect(field.max).toBe(90);
    });
  });
});
