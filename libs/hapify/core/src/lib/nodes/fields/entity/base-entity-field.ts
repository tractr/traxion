import type { Model } from '../../model';
import { BaseField } from '../base-field';

/**
 * This class is tested via the children classes, especially the EntityOneToOneField class
 */
export abstract class BaseEntityField extends BaseField {
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
