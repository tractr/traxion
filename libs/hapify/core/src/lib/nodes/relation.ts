import { Field } from './fields';
import type { Model } from './model';
import { Node } from './node';

export type Cardinality = 'one' | 'many';

export type HalfRelationT = {
  model: Model;
  scalarField: Field;
  virtualField: string;
  cardinality: Cardinality;
};

export type RelationT = {
  name: string;
  referer: HalfRelationT;
  referee: HalfRelationT;
};

export class Relation extends Node {
  readonly referer: HalfRelationT;
  readonly referee: HalfRelationT;

  constructor({ name, referer, referee }: RelationT) {
    super(name);
    this.referer = referer;
    this.referee = referee;
  }
}
