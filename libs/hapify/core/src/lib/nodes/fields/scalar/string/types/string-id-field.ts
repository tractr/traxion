import type { Relation } from '../../../../relation';
import { BaseStringField } from '../base-string-field';

export class StringIdField extends BaseStringField {
  readonly type = 'string' as const;
  readonly subType = 'id' as const;

  protected _relations = new Set<Relation>();

  get relations(): Relation[] {
    return Array.from(this._relations);
  }

  addRelation(relation: Relation) {
    this._relations.add(relation);
  }
}
