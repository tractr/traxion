/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/client/runtime';

import { BaseConstraints, EnumConstraints } from '@trxn/hapify-core';

export function createEnumConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<EnumConstraints, keyof BaseConstraints> & {
  defaultValue: EnumConstraints['defaultValue'];
} {
  const { hasDefaultValue, default: defaultValue } = field;
  return {
    defaultValue:
      hasDefaultValue &&
      typeof defaultValue === 'object' &&
      !Array.isArray(defaultValue)
        ? { name: defaultValue.name, values: {} }
        : undefined,
    enum: {
      name: field.name,
      values: {},
    },
  };
}
