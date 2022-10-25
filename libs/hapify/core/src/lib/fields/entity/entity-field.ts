import { Field } from '../field';
import type { Model } from '../../model';

export abstract class EntityField extends Field {
  constructor(name: string, protected _model: Model) {
    super(name);
  }

  /**
   * The model to which the field is linked
   */
  get model(): Model {
    return this._model;
  }
}

/**
 * Checks if a field is an entity field
 */
export function entity(field: Field): field is EntityField {
  return field instanceof EntityField;
}
