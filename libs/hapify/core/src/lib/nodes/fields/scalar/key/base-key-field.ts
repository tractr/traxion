import type { Relation } from '../../../relation';
import { BaseScalarField } from '../base-scalar-field';

export abstract class BaseKeyField extends BaseScalarField {
  readonly type = 'key' as const;

  protected _primary = false;
  protected _relations = new Set<Relation>();

  get relations(): Relation[] {
    return Array.from(this._relations);
  }

  /** Should be used as a primary key or not */
  get primary(): boolean {
    return this._primary;
  }

  addRelation(relation: Relation): this {
    this._relations.add(relation);
    return this;
  }

  setPrimary(value: boolean): this {
    this._primary = value;
    return this;
  }
}
