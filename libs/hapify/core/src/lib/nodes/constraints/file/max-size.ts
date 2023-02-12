import { FileConstraint } from './file.constraint';

export const FILE_MAX_SIZE_CONSTRAINTS_KEY = 'maxSize' as const;

export class MaxSize extends FileConstraint {
  name = FILE_MAX_SIZE_CONSTRAINTS_KEY;

  maxSize: number;

  constructor(maxSize: number) {
    super();
    this.maxSize = maxSize;
  }
}
