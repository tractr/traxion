import { Model, ModelWithOwnership } from '../models';

/**
 * Traverse the graph from ownerModel to find if the model is owned
 */
export function isModelOwned(
  ownerModel: ModelWithOwnership,
  model: Model,
): boolean {
  if (ownerModel.name === model.name) {
    return true;
  }
  if (ownerModel.ownedModels) {
    return ownerModel.ownedModels.some((ownedModel) =>
      isModelOwned(ownedModel.own, model),
    );
  }
  return false;
}
