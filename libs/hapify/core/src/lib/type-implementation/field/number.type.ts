import { Node } from '../node';
import { FieldProperties } from './common.type';

export type FloatFormat = 'longitude' | 'latitude';

export type FloatFormatConstraint = {
  format?: FloatFormat;
};

export type LimitConstraint = {
  min?: number;
  max?: number;
};

export type IntegerField = Node &
  FieldProperties & {
    type: 'integer';
    constraint?: LimitConstraint;
  };

export type FloatField = Node &
  FieldProperties & {
    type: 'float';
    constraint?: LimitConstraint & FloatFormatConstraint;
  };

export type NumberField = IntegerField | FloatField;
