import { Transform, TransformFnParams } from 'class-transformer';

export function TransformStringToBoolean() {
  return Transform(({ value }: TransformFnParams) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  });
}
