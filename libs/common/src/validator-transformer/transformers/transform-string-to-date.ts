import { Transform, TransformFnParams } from 'class-transformer';

export function TransformStringToDate() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value !== 'string') return value;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date;
  });
}
