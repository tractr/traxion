import { ManyManyRelation, Relation } from '../model';

export function isManyManyRelation(
  relation: Relation,
): relation is ManyManyRelation {
  return relation.type === 'manyMany';
}
