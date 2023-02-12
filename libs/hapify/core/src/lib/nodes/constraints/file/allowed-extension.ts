import { FileConstraint } from './file.constraint';

export const FILE_ALLOWED_EXTENSION_CONSTRAINTS_KEY =
  'allowedExtension' as const;

export class AllowedExtension extends FileConstraint {
  name = FILE_ALLOWED_EXTENSION_CONSTRAINTS_KEY;

  allowedExtension: string;

  constructor(allowedExtension: string) {
    super();
    this.allowedExtension = allowedExtension;
  }
}
