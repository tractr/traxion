import {
  FileAudioField,
  FileBasicField,
  FileDocumentField,
  FileImageField,
  FileVideoField,
} from './types';

export type FileField =
  | FileBasicField
  | FileAudioField
  | FileImageField
  | FileVideoField
  | FileDocumentField;
