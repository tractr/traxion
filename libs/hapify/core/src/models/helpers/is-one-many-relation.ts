import { OneManyRelation, Relation } from '../model';

export function isOneManyRelation(
  relation: Relation,
): relation is OneManyRelation {
  return relation.type === 'oneMany';
}
