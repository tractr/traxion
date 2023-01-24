import {
  Field,
  FileAudioField,
  FileBasicField,
  FileDocumentField,
  FileField,
  FileImageField,
  FileVideoField,
} from '../../../nodes';

/**
 * Checks if a field is a basic file field
 */
export function isBasicFile(field: Field): field is FileBasicField {
  return field.type === 'file' && field.subType === 'basic';
}

/**
 * Checks if a field is an audio file field
 */
export function isAudio(field: Field): field is FileAudioField {
  return field.type === 'file' && field.subType === 'audio';
}

/**
 * Checks if a field is a document file field
 */
export function isDocument(field: Field): field is FileDocumentField {
  return field.type === 'file' && field.subType === 'document';
}

/**
 * Checks if a field is an image file field
 */
export function isImage(field: Field): field is FileImageField {
  return field.type === 'file' && field.subType === 'image';
}

/**
 * Checks if a field is a video file field
 */
export function isVideo(field: Field): field is FileVideoField {
  return field.type === 'file' && field.subType === 'video';
}

/**
 * Test every file field type
 */
export function isFile(field: Field): field is FileField {
  return field.type === 'file';
}
