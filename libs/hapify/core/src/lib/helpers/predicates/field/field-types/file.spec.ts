import {
  FileAudioField,
  FileBasicField,
  FileDocumentField,
  FileImageField,
  FileVideoField,
  StringBasicField,
} from '../../../../nodes';
import {
  isAudio,
  isBasicFile,
  isDocument,
  isFile,
  isImage,
  isVideo,
} from './file';

describe('isBasicFile', () => {
  it('should return true', () => {
    expect(isBasicFile(new FileBasicField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isBasicFile(new FileAudioField('test'))).toBe(false);
  });
});

describe('isAudio', () => {
  it('should return true', () => {
    expect(isAudio(new FileAudioField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isAudio(new FileBasicField('test'))).toBe(false);
  });
});

describe('isDocument', () => {
  it('should return true', () => {
    expect(isDocument(new FileDocumentField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isDocument(new FileBasicField('test'))).toBe(false);
  });
});

describe('isImage', () => {
  it('should return true', () => {
    expect(isImage(new FileImageField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isImage(new FileBasicField('test'))).toBe(false);
  });
});

describe('isVideo', () => {
  it('should return true', () => {
    expect(isVideo(new FileVideoField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isVideo(new FileBasicField('test'))).toBe(false);
  });
});

describe('isFile', () => {
  it('should return true', () => {
    expect(isFile(new FileBasicField('test'))).toBe(true);
    expect(isFile(new FileAudioField('test'))).toBe(true);
    expect(isFile(new FileDocumentField('test'))).toBe(true);
    expect(isFile(new FileImageField('test'))).toBe(true);
    expect(isFile(new FileVideoField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isFile(new StringBasicField('test'))).toBe(false);
  });
});
