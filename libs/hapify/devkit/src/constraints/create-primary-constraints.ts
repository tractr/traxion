/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/client/runtime';

import { BaseConstraints, PrimaryConstraints } from '@trxn/hapify-core';

export function createPrimaryConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<PrimaryConstraints, keyof BaseConstraints> {
  return {
    fieldType: field.type === 'Int' ? 'number' : 'string',
  };
}
