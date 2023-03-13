import { ForeignField } from '../fields';
import { Model, Relation } from '../models';
import { Schema } from '../schema';

export type OwnedModel = {
  own: ModelWithOwnership;
  relation: Relation;
  on?: {
    model: Model;
    field: ForeignField | ForeignField[];
  };
};

export type ModelWithOwnership = Model & {
  ownedModels: OwnedModel[];
};

/**
 * Discover the ownerships graphql of the models starting by the user model
 *
 * A direct owned model is a model that has a foreign key field linking to the user table
 *  -> this models can be automatically detected by the generator
 *
 * An indirect owned model is a model that has a foreign key field linking to a direct owned model or another indirect owned model
 * -> this models can be automatically detected by the generator
 *
 * Hapify core need to know which models is the user model
 */
export function discoverOwnership(
  model: Model,
  schema: Schema,
  explored: Model[] = [],
): ModelWithOwnership {
  // First we will need to find the direct owned models of the model
  let ownedModels = schema.relations
    .filter(
      (relation) =>
        // We check for the direct owned models
        relation.from.model === model || relation.to.model === model,
    )
    .map((relation) => {
      switch (relation.type) {
        case 'oneOne':
        case 'oneMany':
          if (relation.from.model === model) {
            return {
              own: relation.to.model,
              relation,
              on: {
                model: relation.to.model,
                field: relation.to.foreign,
              },
            };
          }
          return {
            own: relation.from.model,
            relation,
            on: {
              model: relation.to.model,
              field: relation.to.foreign,
            },
          };
        case 'manyMany':
          if (relation.from.model === model) {
            return {
              own: relation.to.model,
              relation,
            };
          }
          return {
            own: relation.from.model,
            relation,
          };
        default:
          throw new Error(`Unsupported relation type`);
      }
    })
    .reduce((acc, ownedModel) => {
      acc.push({ ...ownedModel, own: { ...ownedModel.own, ownedModels: [] } });
      return acc;
    }, [] as OwnedModel[]);

  // Then we will need to find the indirect owned models of the model
  ownedModels = ownedModels.map((ownedModel) => {
    if (explored.includes(ownedModel.own)) {
      return ownedModel;
    }

    return {
      ...ownedModel,
      own: discoverOwnership(ownedModel.own, schema, [...explored, model]),
    };
  });

  return {
    ...model,
    ownedModels,
  };
}
