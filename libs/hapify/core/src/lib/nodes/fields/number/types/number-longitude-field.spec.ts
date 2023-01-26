import { NumberLongitudeField } from './number-longitude-field';

describe('NumberLongitudeField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new NumberLongitudeField('test');
      expect(field).toBeInstanceOf(NumberLongitudeField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new NumberLongitudeField('test');
      expect(field.type).toBe('number');
      expect(field.subType).toBe('longitude');
    });
  });
  describe('min', () => {
    it('should be -180 by default', () => {
      const field = new NumberLongitudeField('test');
      expect(field.min).toBe(-180);
    });
    it('should not be lower than -180', () => {
      const field = new NumberLongitudeField('test');
      field.setMin(-181);
      expect(field.min).toBe(-180);
    });
  });
  describe('max', () => {
    it('should be 180 by default', () => {
      const field = new NumberLongitudeField('test');
      expect(field.max).toBe(180);
    });
    it('should not be higher than 180', () => {
      const field = new NumberLongitudeField('test');
      field.setMax(181);
      expect(field.max).toBe(180);
    });
  });
});
