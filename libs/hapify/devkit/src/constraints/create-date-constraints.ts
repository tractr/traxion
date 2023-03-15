/* eslint-disable @typescript-eslint/no-unused-vars */

import { DMMF } from '@prisma/generator-helper';

import { BaseConstraints, DateConstraints } from '@trxn/hapify-core';

export function createDateConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<DateConstraints, keyof BaseConstraints> & {
  defaultValue: DateConstraints['defaultValue'];
} {
  const { hasDefaultValue, default: defaultValue } = field;
  return {
    scalar: 'date',
    defaultValue:
      hasDefaultValue &&
      (typeof defaultValue === 'string' || typeof defaultValue === 'number')
        ? new Date(defaultValue)
        : undefined,
  };
}
