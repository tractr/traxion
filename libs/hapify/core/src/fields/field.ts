/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BaseField,
  GetFieldType,
  GetFieldWithConstraints,
  OptionalConstraint,
  PermissionType,
  RequiredConstraint,
} from './base-types';
import type { BooleanField } from './boolean-field';
import type { DateField } from './date-field';
import type { EnumField } from './enum-field';
import { hasConstraintFactory, isConstraintFactory } from './factories';
import type { FileField } from './file-field';
import type { ForeignField } from './foreign-field';
import type { NumberField } from './number-field';
import type { ObjectField } from './object-field';
import type { PrimaryField } from './primary-field';
import type { StringField } from './string-field';
import type { VirtualField } from './virtual-field';
import type { Relation } from '../models';

/**
 * Field Base constraints
 */
export type BaseConstraints = DocumentationConstraint &
  LabelConstraint &
  UniqueConstraint &
  IsRequiredConstraint &
  DefaultConstraint &
  MultipleConstraint &
  SearchableConstraint &
  SortableConstraint;

export type ScalarType = 'string' | 'number' | 'boolean' | 'object' | 'date';

export type ScalarConstraint<T extends ScalarType | null = null> =
  RequiredConstraint<'scalar', T>;
export type DocumentationConstraint = OptionalConstraint<
  'documentation',
  string
>;
export type LabelConstraint = OptionalConstraint<'isLabel', boolean>;
export type UniqueConstraint = OptionalConstraint<'isUnique', boolean>;
export type IsRequiredConstraint = OptionalConstraint<'isRequired', boolean>;
export type MultipleConstraint = OptionalConstraint<'isMultiple', boolean>;
export type SearchableConstraint = OptionalConstraint<'isSearchable', boolean>;
export type SortableConstraint = OptionalConstraint<'isSortable', boolean>;
export type PermissionConstraint = OptionalConstraint<
  'permission',
  PermissionType
>;

/**
 * Relation constraints
 */
export type RelationConstraint = RequiredConstraint<'relation', Relation>;
export type RelationsConstraint = RequiredConstraint<'relations', Relation[]>;
export type ForeignConstraint<T extends ForeignField[] | null = null> =
  RequiredConstraint<'foreign', T>;

/**
 * Common constraints
 */
export type DefaultConstraint<T = unknown> = OptionalConstraint<
  'defaultValue',
  T
>;
export type FormatConstraint<T> = OptionalConstraint<'format', T>;

/**
 * Check if field match this constraint
 */
export type DocumentationSettable<F extends BaseField> =
  GetFieldWithConstraints<F, DocumentationConstraint>;
export type LabelSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  LabelConstraint
>;
export type UniqueSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  UniqueConstraint
>;
export type NullSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  IsRequiredConstraint
>;
export type DefaultValueSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  DefaultConstraint
>;
export type MultipleSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  MultipleConstraint
>;
export type Searchable<F extends BaseField> = GetFieldWithConstraints<
  F,
  SearchableConstraint
>;
export type Sortable<F extends BaseField> = GetFieldWithConstraints<
  F,
  SortableConstraint
>;
export type RelationSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  RelationConstraint
>;
export type RelationsSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  RelationsConstraint
>;
export type FormatSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  FormatConstraint<any>
>;

/**
 * List of Field that match this constraints
 */
export type DocumentationSettableField = DocumentationSettable<Field>;
export type LabelSettableField = LabelSettable<Field>;
export type UniqueSettableField = UniqueSettable<Field>;
export type NullSettableField = NullSettable<Field>;
export type DefaultValueSettableField = DefaultValueSettable<Field>;
export type MultipleSettableField = MultipleSettable<Field>;
export type SearchableField = Searchable<Field>;
export type SortableField = Sortable<Field>;
export type FormatField = FormatSettable<Field>;

export type RelationSettableField = RelationSettable<Field>;
export type RelationsSettableField = RelationsSettable<Field>;

/**
 * All Traxion Fields
 */
export type Field =
  | BooleanField
  | DateField
  | EnumField
  | FileField
  | ForeignField
  | NumberField
  | ObjectField
  | PrimaryField
  | StringField
  | VirtualField;

export type RelationConstraintDeclaration = {
  name: string;
  onDelete: string;
  from: {
    model: string;
    fields: string[];
  };
  to: {
    model: string;
    fields: string[];
  };
};

export type FieldDeclaration<F extends Field = Field> = F extends
  | Omit<VirtualField, 'foreign'>
  | ForeignField
  | PrimaryField
  ? F extends VirtualField
    ? Omit<F, 'relation' | 'foreign'> & {
        relation: RelationConstraintDeclaration;
      }
    : Omit<F, 'relations' | 'relation' | 'foreign'>
  : F;

export type FieldType = GetFieldType<Field>;

/**
 * Predicates and helpers
 */

export const isUniqueField = isConstraintFactory('isUnique');
export const isNullField = isConstraintFactory('isNull');
export const isSearchableField = isConstraintFactory('isSearchable');
export const isMultipleField = isConstraintFactory('isMultiple');
export const isSortableField = isConstraintFactory('isSortable');

export const hasDocumentationConstraint = hasConstraintFactory('documentation');
export const hasLabelConstraint = hasConstraintFactory('label');
export const hasUniqueConstraint = hasConstraintFactory('isUnique');
export const hasIsRequiredConstraint = hasConstraintFactory('isNull');
export const hasDefaultConstraint = hasConstraintFactory('defaultValue');
export const hasSearchableConstraint = hasConstraintFactory('isSearchable');
export const hasMultipleConstraint = hasConstraintFactory('isMultiple');
export const hasSortableConstraint = hasConstraintFactory('isSortable');

export const hasFormatConstraint = hasConstraintFactory('format');
