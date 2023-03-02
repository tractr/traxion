import { DMMF } from '@prisma/client/runtime';

import { convertToModel } from './models';

import { Model, Schema } from '@trxn/hapify-core';

/**
 * Convert a DMMF Datamodel to a Hapify schema.
 * @param dataModel
 * @returns
 */
export function convertDmmfToHapify(dataModel: DMMF.Datamodel): Schema {
  const models: Model[] = dataModel.models.map((model) =>
    convertToModel(model),
  );
  return { models };
}
