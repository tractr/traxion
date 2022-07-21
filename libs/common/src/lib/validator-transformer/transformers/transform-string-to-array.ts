import { Transform, TransformFnParams } from 'class-transformer';

import { transformStringToArray } from '../../helpers';

export function TransformStringToArray() {
  return Transform(({ value }: TransformFnParams) =>
    transformStringToArray(value),
  );
}

/**
 * @deprecated Use TransformStringToArray instead
 */
/* istanbul ignore next */
export function TransformStringToArrayOfString() {
  return TransformStringToArray();
}
