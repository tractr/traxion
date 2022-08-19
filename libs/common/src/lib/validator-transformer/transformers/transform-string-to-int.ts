import { Transform, TransformFnParams } from 'class-transformer';
import { isInt } from 'class-validator';

export function TransformStringToInt() {
  return Transform(({ value }: TransformFnParams) => {
    if (isInt(value)) return value;
    if (typeof value !== 'string') return value;

    return isInt(Number(value)) ? Number(value) : value;
  });
}
