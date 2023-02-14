import { Node } from '../node';
import { defaultFieldProperties, FieldProperties } from './common.type';

export type StringFormat =
  | 'email'
  | 'url'
  | 'ipv4'
  | 'ipv6'
  | 'uuid'
  | 'json'
  | 'jsonb';

export type StringFormatConstraint = {
  format?: StringFormat;
};

export type StringLengthConstraint = {
  min?: number;
  max?: number;
};

export type StringConstraint = StringLengthConstraint & StringFormatConstraint;

export type VarcharField = Node &
  FieldProperties & {
    type: 'varchar';
    constraint: StringConstraint;
  };

export type TextField = Node &
  FieldProperties & {
    type: 'text';
    constraint: StringConstraint;
  };

export type StringField = VarcharField | TextField;

export function varcharFieldBuilder(
  defaultValue: Omit<VarcharField, 'name' | 'type'>,
) {
  return <T extends string>(
    name: T,
    props: Partial<Omit<VarcharField, 'name' | 'type'>> = {},
  ): VarcharField & { name: T } => ({
    ...defaultValue,
    constraint: {},
    name,
    type: 'varchar',
    ...props,
  });
}

export const varcharField = varcharFieldBuilder(defaultFieldProperties);

const test = varcharField('test', {});

export const projectModels = project('app', {
  relations: [
    reference: {
      model: 'User',
      scalair: 'id',
      virtual: 'i'
    }
  ]

})
