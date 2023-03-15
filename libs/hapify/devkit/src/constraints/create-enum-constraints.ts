/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/generator-helper';

import { BaseConstraints, EnumConstraints } from '@trxn/hapify-core';

export function createEnumConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<EnumConstraints, keyof BaseConstraints | 'enum'> & {
  defaultValue: EnumConstraints['defaultValue'];
} {
  const { hasDefaultValue, default: defaultValue } = field;
  return {
    scalar: 'string',
    defaultValue:
      hasDefaultValue &&
      typeof defaultValue === 'object' &&
      !Array.isArray(defaultValue)
        ? { name: defaultValue.name, values: {} }
        : undefined,
  };
}
