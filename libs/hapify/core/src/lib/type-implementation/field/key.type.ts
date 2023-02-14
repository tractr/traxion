import { Node } from '../node';
import { FieldProperties } from './common.type';

export type KeyRole = 'primary' | 'foreign';

export type RoleConstraint = {
  role?: KeyRole;
};

export type AutoIncrementConstraint = {
  autoIncrement?: boolean;
};

export type NumericKeyConstraint = RoleConstraint & AutoIncrementConstraint;

export type StringKeyConstraint = RoleConstraint;

export type NumericKeyField = Node &
  FieldProperties & {
    type: 'numericKey';
    constraint: NumericKeyConstraint;
  };

export type StringKeyField = Node &
  FieldProperties & {
    type: 'stringKey';
    constraint: StringKeyConstraint;
  };

export type KeyField = NumericKeyField | StringKeyField;
