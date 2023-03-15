import { isEnum, isField } from '../../fields';
import { IsModel } from '../model';

/**
 * Check if a model is valid
 * @param model
 * @returns
 */
export function isModel<M>(model: M): model is IsModel<M> {
  return (
    typeof model === 'object' &&
    model !== null &&
    'name' in model &&
    typeof model.name === 'string' &&
    'fields' in model &&
    Array.isArray(model.fields) &&
    model.fields.every(isField) &&
    'enums' in model &&
    Array.isArray(model.enums) &&
    model.enums.every(isEnum)
  );
}
