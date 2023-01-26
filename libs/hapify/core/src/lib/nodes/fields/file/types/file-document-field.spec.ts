import { FileDocumentField } from './file-document-field';

describe('FileDocumentField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new FileDocumentField('test');
      expect(field).toBeInstanceOf(FileDocumentField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new FileDocumentField('test');
      expect(field.type).toBe('file');
      expect(field.subType).toBe('document');
    });
  });
});
