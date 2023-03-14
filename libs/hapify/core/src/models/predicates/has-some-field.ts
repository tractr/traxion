import { isModel } from './is-model';
import { Model } from '../model';

/**
 * Predicate to check if a model has at least one field of a given type
 * @param model
 * @param type
 * @returns
 *
 * @example
 *
 * const a = {
 *   name: 'A',
 *   fields: [
 *     { name: 'a', type: 'number' },
 *     { name: 'b', type: 'string' },
 *   ],
 * };
 *
 * const b = {
 *   name: 'B',
 *   fields: [{ name: 'a', type: 'boolean' }],
 * };
 *
 * hasSomeField(a, 'string'); // true
 * hasSomeField(a, 'boolean'); // false
 * hasSomeField(b, 'boolean'); // true
 */
export function hasSomeField<M extends Model, T extends string>(
  model: M,
  type: T,
): boolean {
  if (typeof type !== 'string') return false;
  return isModel(model) && model.fields.some((f) => f.type === type);
}
