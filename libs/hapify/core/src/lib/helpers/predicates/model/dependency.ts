import { Model } from '../../../nodes';
import {
  ModelReferenced,
  ModelSelfDependent,
  ModelSelfReferenced,
  ModelWithDependencies,
} from '../../interfaces';

/**
 * Check if the model has dependencies.
 */
export function hasDependencies<T extends Model>(
  model: T,
): model is T & ModelWithDependencies {
  return model.hasDependencies;
}

/**
 * Check if the model is self-dependent.
 */
export function isSelfDependent<T extends Model>(
  model: T,
): model is T & ModelSelfDependent {
  return model.isSelfDependent;
}

/**
 * Check if the model is referenced.
 */
export function isReferenced<T extends Model>(
  model: T,
): model is T & ModelReferenced {
  return model.isReferenced;
}

/**
 * Check if the model is self-referenced.
 */
export function isSelfReferenced<T extends Model>(
  model: T,
): model is T & ModelSelfReferenced {
  return model.isSelfReferenced;
}
