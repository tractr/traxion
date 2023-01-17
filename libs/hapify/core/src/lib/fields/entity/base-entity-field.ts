import type { Model } from '../../model';
import { BaseField } from '../base-field';

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
