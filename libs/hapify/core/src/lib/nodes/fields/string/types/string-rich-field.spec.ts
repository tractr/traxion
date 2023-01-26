import { StringRichField } from './string-rich-field';

describe('StringRichField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new StringRichField('test');
      expect(field).toBeInstanceOf(StringRichField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new StringRichField('test');
      expect(field.type).toBe('string');
      expect(field.subType).toBe('rich');
    });
  });
  describe('allowedTypes', () => {
    it('should be undefined by default', () => {
      const field = new StringRichField('test');
      expect(field.allowedTypes).toBeUndefined();
    });
    it('should set allowed types', () => {
      const field = new StringRichField('test');
      field.setAllowedTypes(['h1', 'h2']);
      expect(field.allowedTypes).toEqual(['h1', 'h2']);
    });
  });
});
