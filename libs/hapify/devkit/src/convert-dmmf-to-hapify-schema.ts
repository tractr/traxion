import type { DMMF } from '@prisma/client/runtime';

import { convertDmmfModelToHapifyModel } from './convert-dmmf-model-to-hapify-model';

import { Model, Schema } from '@trxn/hapify-core';

/**
 * Convert a DMMF Datamodel to a Hapify schema.
 * @param dataModel
 * @returns
 */
export function convertDmmfToHapifySchema(dmmf: DMMF.Document): Schema {
  const models: Model[] = dmmf.datamodel.models.map((model) =>
    convertDmmfModelToHapifyModel(model),
  );
  return { models };
}
