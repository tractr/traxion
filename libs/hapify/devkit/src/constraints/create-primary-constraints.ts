/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/generator-helper';

import { BaseConstraints, PrimaryConstraints } from '@trxn/hapify-core';

export function createPrimaryConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<PrimaryConstraints, keyof BaseConstraints> {
  return {
    relations: [],
    scalar: field.type === 'String' ? 'string' : 'number',
  };
}
