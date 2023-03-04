import { Model, ModelDeclaration } from '../models';

export function getModel<M extends Model | ModelDeclaration>(
  name: string,
  models: M[],
): M | undefined {
  return models.find((model) => model.name === name);
}
