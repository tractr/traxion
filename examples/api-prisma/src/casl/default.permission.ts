import { AbilityBuilder, AnyAbility } from '@casl/ability';

import { canReadActionUser, canWriteActionUser } from './can/can-action-user';
import { UserWithOwnershipIds } from './user.select';

import { ForeignField, Model, Relation, Schema } from '@trxn/hapify-core';

/**
 * Minimal permissions for a connected user
 *
 * This function is intended to be used by extended it in the project to compose your own permissions
 *
 * It is intended to be used when your are not using the roles and write from the database
 *
 * If an entity is owned by a user, the user can read, create and update it
 * else the user can only read it
 *
 * A direct owned model is a model that has a foreign key field linking to the user table
 *  -> this models can be automatically detected by the generator
 *
 * An indirect owned model is a model that has a foreign key field linking to a direct owned model or another indirect owned model
 * -> this models can be automatically detected by the generator
 *
 * Hapify core need to know which models is the user model
 */
export function minimalUserPermission(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  canReadActionUser(abilities, user);
  canWriteActionUser(abilities, user, false);
}

type OwnedModel = {
  own: Model;
  relation: Relation;
  on?: {
    model: Model;
    field: ForeignField | ForeignField[];
  };
};

type ModelWithOwnership = Model & {
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
      acc.push(ownedModel);
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
