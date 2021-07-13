import { Transform, TransformFnParams } from 'class-transformer';

export function filterInt(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return value;

  return /^[-+]?(\d+|Infinity)$/.test(value) ? Number(value) : NaN;
}

export function TransformStringToInt() {
  return Transform(({ value }: TransformFnParams) => filterInt(value));
}
