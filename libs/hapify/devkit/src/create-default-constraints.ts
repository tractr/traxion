import { DMMF } from '@prisma/client/runtime';

import { extractMetadataFromDocumentation } from './extract-metadata-from-documentation';
import { FieldValidations } from './interfaces/validations.interface';

import { BaseConstraints } from '@trxn/hapify-core';

export function createDefaultConstraints(
  field: DMMF.Field,
  validations: FieldValidations,
): BaseConstraints {
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

  const { metadata, documentation } = extractMetadataFromDocumentation(
    docs,
    validations,
  );

  return {
    defaultValue: hasDefaultValue ? defaultValue : undefined,
    isMultiple: isList,
    isRequired,
    isUnique,

    ...metadata,
  };
}
