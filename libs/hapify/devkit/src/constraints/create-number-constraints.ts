/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/generator-helper';

import { BaseConstraints, NumberConstraints } from '@trxn/hapify-core';

export function createNumberConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<NumberConstraints, keyof BaseConstraints> & {
  defaultValue: NumberConstraints['defaultValue'];
} {
  const { min, max } = metadata;
  const { type } = field;

  return {
    scalar: 'number',
    min: min ? Number(min) : undefined,
    max: max ? Number(max) : undefined,
    format: type === 'Float' ? 'float' : 'integer',
    defaultValue: field.hasDefaultValue
      ? Number(field.defaultValue)
      : undefined,
  };
}
