import { Relation } from '../../relation';
import { VirtualField } from '../virtual-field';

export class RelationField extends VirtualField {
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
