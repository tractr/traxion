import { getUserModel } from './get-user-model';

import {
  discoverOwnership,
  ModelWithOwnership,
  Schema,
} from '@trxn/hapify-core';

export function getSelectOwnership(model: ModelWithOwnership): {
  select: Record<string, unknown>;
} {
  return {
    select: {
      ...model.primaryKey?.fields.reduce((acc, field) => {
        acc[field.name] = true;
        return acc;
      }, {} as Record<string, boolean>),
      ...model.ownedModels.reduce((acc, owned) => {
        const select = getSelectOwnership(owned.own);
        const { relation } = owned;
        const virtualField =
          relation.from.model.name === model.name
            ? relation.from.virtual
            : relation.to.virtual;
        return {
          ...acc,
          [virtualField.name]: {
            select: {
              ...(acc.select || {}),
              ...select.select,
            },
          },
        };
      }, {} as Record<string, unknown>),
    },
  };
}
