import { FieldAction, Scope } from '../../nodes';

export interface PrimaryField {
  primary: true;
}

export interface UniqueField {
  unique: true;
}

export interface LabelField {
  label: true;
}

export interface NullableField {
  nullable: true;
}

export interface MultipleField {
  multiple: true;
}

export interface SearchableField {
  searchable: true;
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
