import { Transform, TransformFnParams } from 'class-transformer';

export function TransformStringToNumber() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value !== 'string') return value;

    const number = Number(value);
    if (Number.isNaN(number)) return value;
    return number;
  });
}
