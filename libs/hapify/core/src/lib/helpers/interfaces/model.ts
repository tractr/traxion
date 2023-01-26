import { Model, ModelAction, Scope } from '../../nodes';

export interface ModelWithOwner {
  owner: Model;
}

export interface ModelWithDependencies {
  hasDependencies: true;
}

export interface ModelSelfDependent {
  isSelfDependent: true;
}

export interface ModelReferenced {
  isReferenced: true;
}

export interface ModelSelfReferenced {
  isSelfReferenced: true;
}

export interface ModelActionScope<A extends ModelAction, S extends Scope> {
  actionsScopes: { [key in A]: S };
}
