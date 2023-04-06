import { isVirtualField } from '../../fields';
import { Model, Relation } from '../model';

/**
 * Return all relations of a model
 *
 * @param model - Model to get relations from
 * @returns the relations of the model
 */
export function getRelations(model: Model): Relation[] {
  return Object.values(
    model.fields.filter(isVirtualField).reduce(
      (relations, { relation }) => ({
        ...relations,
        [relation.name]: relation,
      }),
      {},
    ),
  );
}

/**
 * Return all the models that are related to a model
 *
 * @param model - Model to get related models from
 * @returns the related models
 */
export function getRelatedModels(model: Model): Model[] {
  return Object.values(
    getRelations(model).reduce((relatedModels, { from, to }) => {
      const newRelatedModels = { ...relatedModels };

      // Throw an error if the relation is invalid
      if (from.model.name !== model.name && to.model.name !== model.name)
        throw new Error(
          'Relation is invalid as it never include the referer model',
        );
      // if its a self relation, keep the model itself
      else if (from.model.name === model.name && to.model.name === model.name)
        newRelatedModels[to.model.name] = to.model;
      // Keep only the related and ignore the model itself when its not a self relation
      else if (from.model.name !== model.name)
        newRelatedModels[from.model.name] = from.model;
      // Keep only the related and ignore the model itself when its not a self relation
      else newRelatedModels[to.model.name] = to.model;

      return newRelatedModels;
    }, {} as Record<string, Model>),
  );
}

/**
 * Return all the models that are related to a model without the model itself
 *
 * @param model - Model to get related models from
 * @returns the related models without the model itself
 */
export function getRelatedModelsWithoutSelf(model: Model): Model[] {
  return getRelatedModels(model).filter(
    (relatedModel) => relatedModel.name !== model.name,
  );
}
