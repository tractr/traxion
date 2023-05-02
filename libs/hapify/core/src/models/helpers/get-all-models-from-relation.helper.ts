import { getOppositeModelFromRelation } from './get-opposite-model-from-relation.helper';
import { isVirtualField } from '../../fields';
import { Model } from '../model';

export function getAllModelsFromRelation(model: Model) {
  return [
    ...new Set(
      model.fields
        .filter(isVirtualField)
        .map((virtualField) =>
          getOppositeModelFromRelation(model, virtualField.relation),
        ),
    ),
  ].filter((m) => m.name !== model.name);
}
