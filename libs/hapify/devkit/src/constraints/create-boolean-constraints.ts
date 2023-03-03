/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/client/runtime';

import { BaseConstraints, BooleanConstraints } from '@trxn/hapify-core';

export function createBooleanConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<BooleanConstraints, keyof BaseConstraints> & {
  defaultValue?: BooleanConstraints['defaultValue'];
} {
  const { hasDefaultValue, default: defaultValue } = field;
  return {
    // defaultValue: hasDefaultValue ? !!defaultValue : undefined,
  };
}
