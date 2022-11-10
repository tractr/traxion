import { Field } from '../field';
import { FileField } from './file-field';

export class FileDocumentField extends FileField {}

/**
 * Checks if a field is a document file field
 */
export function isFileDocument(field: Field): field is FileDocumentField {
  return field instanceof FileDocumentField;
}
