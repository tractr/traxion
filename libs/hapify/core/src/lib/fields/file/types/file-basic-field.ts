import { BaseFileField } from '../base-file-field';

export class FileBasicField extends BaseFileField {
  readonly type = 'file' as const;
  readonly subType = 'basic' as const;
}
