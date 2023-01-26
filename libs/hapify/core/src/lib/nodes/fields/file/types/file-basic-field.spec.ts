import { BaseFileField } from '../base-file-field';
import { FileBasicField } from './file-basic-field';

describe('BaseFileField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new FileBasicField('test');
      expect(field).toBeInstanceOf(BaseFileField);
    });
  });

  describe('maxSize', () => {
    it('should be undefined by default', () => {
      const field = new FileBasicField('test');
      expect(field.maxSize).toBeUndefined();
    });

    it('should set the max size', () => {
      const field = new FileBasicField('test');
      field.setMaxSize(100);
      expect(field.maxSize).toBe(100);
    });
  });

  describe('allowedExtensions', () => {
    it('should be empty by default', () => {
      const field = new FileBasicField('test');
      expect(field.allowedExtensions).toEqual([]);
    });

    it('should set the allowed extensions', () => {
      const field = new FileBasicField('test');
      field.addAllowedExtension('jpg');
      field.addAllowedExtension('png');
      expect(field.allowedExtensions).toEqual(['jpg', 'png']);
    });

    it('should remove the allowed extensions', () => {
      const field = new FileBasicField('test');
      field.addAllowedExtension('jpg');
      field.addAllowedExtension('png');
      field.removeAllowedExtension('jpg');
      expect(field.allowedExtensions).toEqual(['png']);
    });
  });
});

describe('FileBasicField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new FileBasicField('test');
      expect(field).toBeInstanceOf(FileBasicField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new FileBasicField('test');
      expect(field.type).toBe('file');
      expect(field.subType).toBe('basic');
    });
  });
});
