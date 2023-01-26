import { FileAudioField } from './file-audio-field';

describe('FileAudioField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new FileAudioField('test');
      expect(field).toBeInstanceOf(FileAudioField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new FileAudioField('test');
      expect(field.type).toBe('file');
      expect(field.subType).toBe('audio');
    });
  });
  describe('minBitrate', () => {
    it('should be undefined by default', () => {
      const field = new FileAudioField('test');
      expect(field.minBitrate).toBeUndefined();
    });
    it('should set the min bitrate', () => {
      const field = new FileAudioField('test');
      field.setMinBitrate(100);
      expect(field.minBitrate).toBe(100);
    });
  });
  describe('maxBitrate', () => {
    it('should be undefined by default', () => {
      const field = new FileAudioField('test');
      expect(field.maxBitrate).toBeUndefined();
    });
    it('should set the max bitrate', () => {
      const field = new FileAudioField('test');
      field.setMaxBitrate(100);
      expect(field.maxBitrate).toBe(100);
    });
  });
});
