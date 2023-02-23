import type { FieldType } from '../../fields';
import type { HaveField, IsModel } from '../model';
import { hasSomeField, isModel } from '../predicates';

/**
 * Factory to create a predicate to check if a model has at least one field of a given type
 * @param type
 * @returns
 *
 * @example
 *
 * const hasSomePrimaryKey = hasSomeFieldFactory('primary');
 * const hasSomeForeignKey = hasSomeFieldFactory('foreign');
 */
export function hasSomeFieldFactory<T extends string = FieldType>(type: T) {
  return <M>(model: M): model is HaveField<IsModel<M>, T> =>
    isModel(model) && hasSomeField(model, type);
}
