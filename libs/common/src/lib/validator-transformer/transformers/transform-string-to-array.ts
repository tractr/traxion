import { Transform, TransformFnParams } from 'class-transformer';

export function TransformStringToArray() {
  return Transform(({ value }: TransformFnParams) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        const array = JSON.parse(value);
        if (Array.isArray(array)) return array;
      } catch {
        return value.split(',');
      }
    }
    return value;
  });
}

/**
 * @deprecated Use TransformStringToArray instead
 */
export function TransformStringToArrayOfString() {
  return TransformStringToArray();
}
