import { NumberFloatField } from './number-float-field';

describe('NumberFloatField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new NumberFloatField('test');
      expect(field).toBeInstanceOf(NumberFloatField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new NumberFloatField('test');
      expect(field.type).toBe('number');
      expect(field.subType).toBe('float');
    });
  });
});
