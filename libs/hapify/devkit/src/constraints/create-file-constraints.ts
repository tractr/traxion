/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/client/runtime';

import { BaseConstraints, FileConstraints } from '@trxn/hapify-core';

export function createFileConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<FileConstraints, keyof BaseConstraints> & {
  defaultValue?: object;
} {
  const { hasDefaultValue, default: defaultValue } = field;
  return {
    defaultValue:
      hasDefaultValue && typeof defaultValue === 'object'
        ? defaultValue
        : undefined,
  };
}
