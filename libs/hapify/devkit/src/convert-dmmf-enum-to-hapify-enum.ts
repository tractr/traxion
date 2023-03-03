import type { DMMF } from '@prisma/generator-helper';

import { EnumType } from '@trxn/hapify-core';

/**
 * Convert a DMMF enum to a Hapify enum.
 * @param dmmfEnum - Enum as defined in prisma DMMF
 * @returns Enum as defined in Hapify
 */
export function convertDmmfEnumToHapifyEnum(
  dmmfEnum: DMMF.DatamodelEnum,
): EnumType {
  return {
    name: dmmfEnum.name,
    values: dmmfEnum.values.reduce(
      (enumRecord, { name, dbName }) => ({
        ...enumRecord,
        [name]: dbName ?? name,
      }),
      {},
    ),
    // TODO: Add mapping for documentation and metadata
  };
}
