/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/client/runtime';

import { BaseConstraints, ObjectConstraints } from '@trxn/hapify-core';

export function createObjectConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<ObjectConstraints, keyof BaseConstraints> {
  return {};
}
