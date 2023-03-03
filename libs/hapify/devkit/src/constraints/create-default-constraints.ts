import type { DMMF } from '@prisma/client/runtime';

import { extractMetadataFromDocumentation } from '../extract-metadata-from-documentation';
import { FieldValidations } from '../interfaces/validations.interface';

import { BaseConstraints } from '@trxn/hapify-core';

export function createDefaultConstraints(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): Omit<BaseConstraints, 'defaultValue'> {
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
