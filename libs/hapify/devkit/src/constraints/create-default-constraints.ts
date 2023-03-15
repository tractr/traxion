import type { DMMF } from '@prisma/generator-helper';

import { BaseConstraints } from '@trxn/hapify-core';

export function createDefaultConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<BaseConstraints, 'defaultValue' | 'scalar'> {
  const {
    hasDefaultValue,
    isList,
    isReadOnly,
    isRequired,
    isUnique,
    default: defaultValue,
    documentation: docs,
    isGenerated,
    isUpdatedAt,
  } = field;

  return {
    isMultiple: isList,
    isRequired,
    isUnique,
    isLabel: !!metadata.isLabel,
    documentation: (metadata.documentation as string) || docs,
    isSearchable: !!metadata.isSearchable,
    isSortable: !!metadata.isSortable,
  };
}
