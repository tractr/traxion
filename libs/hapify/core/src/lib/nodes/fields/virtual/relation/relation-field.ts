import { Relation } from '../../../relation';
import { BaseVirtualField } from '../base-virtual-field';

export class RelationField extends BaseVirtualField {
  type = 'relation';
  subType = 'relation';

  protected _relation!: Relation;

  get relation(): Relation {
    return this._relation;
  }

  setRelation(relation: Relation) {
    this._relation = relation;
  }
}
