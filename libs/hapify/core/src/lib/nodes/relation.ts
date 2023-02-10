import { KeyField, RelationField } from './fields';
import type { Model } from './model';
import { Node } from './node';

// TODO: à valider
// Piste de reflexion: avoir un type pour chaque type de relation
export type OneOneRelation = {};
export type OneManyRelation = {};
export type ManyOneRelation = {};
export type Relationn = OneOneRelation | OneManyRelation | ManyOneRelation;

export type Cardinality = 'one' | 'many';

export type HalfRelationT = {
  model: Model;
  scalarField: KeyField;
  virtualField: RelationField;
  cardinality: Cardinality;
};

export type RelationT = {
  name: string;
  reference: HalfRelationT;
  dependency: HalfRelationT;
};

export class Relation extends Node {
  readonly reference: HalfRelationT;
  readonly dependency: HalfRelationT;

  constructor({ name, reference, dependency }: RelationT) {
    super(name);
    this.reference = reference;
    this.dependency = dependency;
  }
}
