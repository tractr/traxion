import { Model } from '../../../nodes';
import { ModelWithOwner } from '../../interfaces';

/**
 * Checks if the model has an owner.
 * Denotes of the model is not a root model.
 */
export function hasOwner<T extends Model>(
  model: T,
): model is T & ModelWithOwner {
  return model.owner !== undefined;
}
