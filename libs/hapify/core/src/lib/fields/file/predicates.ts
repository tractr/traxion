import { Field } from '../field';
import { FileField } from './file-field';
import {
  FileAudioField,
  FileBasicField,
  FileDocumentField,
  FileImageField,
  FileVideoField,
} from './types';

/**
 * Checks if a field is a basic file field
 */
export function isBasic(field: Field): field is FileBasicField {
  return field instanceof FileBasicField;
}

/**
 * Checks if a field is an audio file field
 */
export function isAudio(field: Field): field is FileAudioField {
  return field instanceof FileAudioField;
}

/**
 * Checks if a field is a document file field
 */
export function isDocument(field: Field): field is FileDocumentField {
  return field instanceof FileDocumentField;
}

/**
 * Checks if a field is an image file field
 */
export function isImage(field: Field): field is FileImageField {
  return field instanceof FileImageField;
}

/**
 * Checks if a field is a video file field
 */
export function isVideo(field: Field): field is FileVideoField {
  return field instanceof FileVideoField;
}

/**
 * Test every file field type
 */
export function isFile(field: Field): field is FileField {
  return (
    isBasic(field) ||
    isAudio(field) ||
    isDocument(field) ||
    isImage(field) ||
    isVideo(field)
  );
}
