import { BooleanField } from './boolean.type';
import { KeyField } from './key.type';
import { NumberField } from './number.type';
import { RelationField } from './relation.type';
import { StringField } from './string.type';

export type ScalarField = BooleanField | KeyField | NumberField | StringField;

export type VirtualField = RelationField;

export type Field = ScalarField | VirtualField;
