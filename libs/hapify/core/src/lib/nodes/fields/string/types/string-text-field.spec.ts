import { StringTextField } from './string-text-field';

describe('StringTextField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new StringTextField('test');
      expect(field).toBeInstanceOf(StringTextField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new StringTextField('test');
      expect(field.type).toBe('string');
      expect(field.subType).toBe('text');
    });
  });
});
