import { OneOneRelation, Relation } from '../model';

export function isOneOneRelation(
  relation: Relation,
): relation is OneOneRelation {
  return relation.type === 'oneOne';
}
