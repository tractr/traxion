/* eslint-disable @typescript-eslint/no-unused-vars */

import { DMMF } from '@prisma/generator-helper';

import { BaseConstraints, BooleanConstraints } from '@trxn/hapify-core';

export function createBooleanConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<BooleanConstraints, keyof BaseConstraints> & {
  defaultValue?: BooleanConstraints['defaultValue'];
} {
  const { hasDefaultValue, default: defaultValue } = field;
  return {
    scalar: 'boolean',
    // defaultValue: hasDefaultValue ? !!defaultValue : undefined,
  };
}
