import { Model, ModelAction, Scope } from '../../nodes';

export interface ModelWithOwner {
  owner: Model;
}

export interface ModelActionScope<A extends ModelAction, S extends Scope> {
  actionsScopes: { [key in A]: S };
}
