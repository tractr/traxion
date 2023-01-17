import { BaseFileField } from '../base-file-field';

export class FileDocumentField extends BaseFileField {
  readonly type = 'file' as const;
  readonly subType = 'document' as const;
}
