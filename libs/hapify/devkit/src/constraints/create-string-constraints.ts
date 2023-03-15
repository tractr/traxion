/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DMMF } from '@prisma/generator-helper';

import { BaseConstraints, StringConstraints } from '@trxn/hapify-core';

export function createStringConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<StringConstraints, keyof BaseConstraints> & {
  defaultValue: StringConstraints['defaultValue'];
} {
  const { format, isEncrypted, minLength, maxLength } = metadata;
  return {
    scalar: 'string',
    format: format as StringConstraints['format'],
    isEncrypted: typeof isEncrypted === 'boolean' ? isEncrypted : false,
    maxLength: typeof maxLength === 'number' ? maxLength : undefined,
    minLength: typeof minLength === 'number' ? minLength : undefined,
    defaultValue:
      field.hasDefaultValue && typeof field.default === 'string'
        ? field.default
        : undefined,
  };
}
