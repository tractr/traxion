import { NumberIntegerField } from './number-integer-field';

describe('NumberIntegerField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new NumberIntegerField('test');
      expect(field).toBeInstanceOf(NumberIntegerField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new NumberIntegerField('test');
      expect(field.type).toBe('number');
      expect(field.subType).toBe('integer');
    });
  });
});
