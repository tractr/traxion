import { DateField } from './date-field';

describe('DateField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new DateField('test');
      expect(field).toBeInstanceOf(DateField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new DateField('test');
      expect(field.type).toBe('date');
      expect(field.subType).toBe('basic');
    });
  });

  describe('min', () => {
    it('should be undefined by default', () => {
      const field = new DateField('test');
      expect(field.min).toBeUndefined();
    });
    it('should be set', () => {
      const field = new DateField('test');
      expect(field.setMin(new Date())).toBe(field); // Test chaining
      expect(field.min).toBeInstanceOf(Date);
    });
  });

  describe('max', () => {
    it('should be undefined by default', () => {
      const field = new DateField('test');
      expect(field.max).toBeUndefined();
    });
    it('should be set', () => {
      const field = new DateField('test');
      expect(field.setMax(new Date())).toBe(field); // Test chaining
      expect(field.max).toBeInstanceOf(Date);
    });
  });

  describe('withTime', () => {
    it('should be false by default', () => {
      const field = new DateField('test');
      expect(field.withTime).toBe(false);
    });
    it('should be set', () => {
      const field = new DateField('test');
      expect(field.setWithTime(true)).toBe(field); // Test chaining
      expect(field.withTime).toBe(true);
    });
  });
});
