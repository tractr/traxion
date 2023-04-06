import { isField } from '../../fields';
import { IsModel } from '../model';

/**
 * Check if a model is valid
 *
 * @param model - Model to check
 * @returns returns true if model is valid, false otherwise
 */
export function isModel<M>(model: M): model is IsModel<M> {
  return (
    // Model must be an object
    typeof model === 'object' &&
    model !== null &&
    // With a name property
    'name' in model &&
    // that is a string
    typeof model.name === 'string' &&
    // With a pluralName property
    'pluralName' in model &&
    // that is a string
    typeof model.pluralName === 'string' &&
    // With a primaryKey property
    'primaryKey' in model &&
    // that is null or an object
    (model.primaryKey === null || typeof model.primaryKey === 'object') &&
    //  With a fields property
    'fields' in model &&
    // that is an array of fields
    Array.isArray(model.fields) &&
    model.fields.every(isField)
  );
}
