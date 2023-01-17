import { BaseEntityField } from '../base-entity-field';

export abstract class EntityMultipleField extends BaseEntityField {
  /**
   * Limit the number of relations
   */
  _limit: number | undefined;

  /**
   * Set the limit of relations
   */
  setLimit(limit: number): this {
    this._limit = limit;
    return this;
  }

  /**
   * Get the limit of relations
   */
  get limit(): number | undefined {
    return this._limit;
  }
}
