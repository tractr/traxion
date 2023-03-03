/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/client/runtime';

import { BaseConstraints, DateConstraints } from '@trxn/hapify-core';

export function createDateConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<DateConstraints, keyof BaseConstraints> & {
  defaultValue: DateConstraints['defaultValue'];
} {
  const { hasDefaultValue, default: defaultValue } = field;
  return {
    defaultValue:
      hasDefaultValue &&
      (typeof defaultValue === 'string' || typeof defaultValue === 'number')
        ? new Date(defaultValue)
        : undefined,
  };
}
