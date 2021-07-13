import { Transform, TransformFnParams } from 'class-transformer';

export function TransformStringToArrayOfString() {
  return Transform(({ value }: TransformFnParams) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',');
    return value;
  });
}
