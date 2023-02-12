import type { Field } from '../../fields/field';
import { FileBasicField } from '../../fields/file/types/file-basic-field';
import { Constraint } from '../constraint';

export const FILE_CONSTRAINTS_KEY = 'file';

export class FileConstraint extends Constraint {
  name = FILE_CONSTRAINTS_KEY;

  canBeUsedWith(field: Field): boolean {
    if (field instanceof FileBasicField) {
      return true;
    }

    return false;
  }
}
