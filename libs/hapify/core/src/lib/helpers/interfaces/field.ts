import { FieldAction, Scope } from '../../nodes';
import {
  Constraint,
  NOT_NULL_CONSTRAINTS_KEY,
  SEARCHABLE_CONSTRAINTS_KEY,
  STRING_LABEL_CONSTRAINTS_KEY,
  UNIQUE_CONSTRAINTS_KEY,
} from '../../nodes/constraints';
import { MULTIPLE_CONSTRAINTS_KEY } from '../../nodes/constraints/any/multiple';

export interface PrimaryField {
  primary: true;
}

export interface UniqueField {
  constraints: {
    [UNIQUE_CONSTRAINTS_KEY]: Constraint;
  };
}

export interface LabelField {
  constraints: {
    [STRING_LABEL_CONSTRAINTS_KEY]: Constraint;
  };
}

export interface NullableField {
  constraints: {
    [NOT_NULL_CONSTRAINTS_KEY]: never;
  };
}

export interface MultipleField {
  constraints: {
    [MULTIPLE_CONSTRAINTS_KEY]: Constraint;
  };
}

export interface SearchableField {
  constraints: {
    [SEARCHABLE_CONSTRAINTS_KEY]: Constraint;
  };
}

export interface SortableField {
  sortable: true;
}
export interface FieldActionScope<
  A extends FieldAction,
  S extends Scope | undefined,
> {
  actionsScopes: { [key in A]: S };
}
