import { isVirtualField } from '../../fields';
import { Model, Relation } from '../model';

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

export function getRelatedModels(model: Model): Model[] {
  return Object.values(
    getRelations(model).reduce(
      (relatedModels, { from, to }) => ({
        ...relatedModels,
        [from.model.name]: from.model,
        [to.model.name]: to.model,
      }),
      {},
    ),
  );
}

export function getRelatedModelsWithoutSelf(model: Model): Model[] {
  return getRelatedModels(model).filter(
    (relatedModel) => relatedModel.name !== model.name,
  );
}
