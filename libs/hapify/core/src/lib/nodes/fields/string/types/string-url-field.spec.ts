import { StringUrlField } from './string-url-field';

describe('StringUrlField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new StringUrlField('test');
      expect(field).toBeInstanceOf(StringUrlField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new StringUrlField('test');
      expect(field.type).toBe('string');
      expect(field.subType).toBe('url');
    });
  });
});
