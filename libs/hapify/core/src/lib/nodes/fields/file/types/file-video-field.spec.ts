import { FileVideoField } from './file-video-field';

describe('FileVideoField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new FileVideoField('test');
      expect(field).toBeInstanceOf(FileVideoField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new FileVideoField('test');
      expect(field.type).toBe('file');
      expect(field.subType).toBe('video');
    });
  });

  describe('minBitrate', () => {
    it('should be undefined by default', () => {
      const field = new FileVideoField('test');
      expect(field.minBitrate).toBeUndefined();
    });
    it('should set the minBitrate', () => {
      const field = new FileVideoField('test');
      field.setMinBitrate(100);
      expect(field.minBitrate).toBe(100);
    });
  });

  describe('maxBitrate', () => {
    it('should be undefined by default', () => {
      const field = new FileVideoField('test');
      expect(field.maxBitrate).toBeUndefined();
    });
    it('should set the maxBitrate', () => {
      const field = new FileVideoField('test');
      field.setMaxBitrate(100);
      expect(field.maxBitrate).toBe(100);
    });
  });

  describe('maxWidth', () => {
    it('should be undefined by default', () => {
      const field = new FileVideoField('test');
      expect(field.maxWidth).toBeUndefined();
    });
    it('should set the maxWidth', () => {
      const field = new FileVideoField('test');
      field.setMaxWidth(100);
      expect(field.maxWidth).toBe(100);
    });
  });

  describe('maxHeight', () => {
    it('should be undefined by default', () => {
      const field = new FileVideoField('test');
      expect(field.maxHeight).toBeUndefined();
    });
    it('should set the maxHeight', () => {
      const field = new FileVideoField('test');
      field.setMaxHeight(100);
      expect(field.maxHeight).toBe(100);
    });
  });

  describe('minWidth', () => {
    it('should be undefined by default', () => {
      const field = new FileVideoField('test');
      expect(field.minWidth).toBeUndefined();
    });
    it('should set the minWidth', () => {
      const field = new FileVideoField('test');
      field.setMinWidth(100);
      expect(field.minWidth).toBe(100);
    });
  });

  describe('minHeight', () => {
    it('should be undefined by default', () => {
      const field = new FileVideoField('test');
      expect(field.minHeight).toBeUndefined();
    });
    it('should set the minHeight', () => {
      const field = new FileVideoField('test');
      field.setMinHeight(100);
      expect(field.minHeight).toBe(100);
    });
  });
});
