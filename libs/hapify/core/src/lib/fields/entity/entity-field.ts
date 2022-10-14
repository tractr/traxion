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
