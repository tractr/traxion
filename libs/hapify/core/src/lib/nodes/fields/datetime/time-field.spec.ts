import { TimeField } from './time-field';

describe('TimeField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new TimeField('test');
      expect(field).toBeInstanceOf(TimeField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new TimeField('test');
      expect(field.type).toBe('time');
      expect(field.subType).toBe('basic');
    });
  });
});
