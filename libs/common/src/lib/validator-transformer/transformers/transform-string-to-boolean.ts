import { Transform, TransformFnParams } from 'class-transformer';

export function TransformStringToBoolean() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value !== 'string') return value;
    const booleanString = value.toLowerCase().trim();
    if (booleanString === 'true') return true;
    if (booleanString === 'false') return false;
    return value;
  });
}
