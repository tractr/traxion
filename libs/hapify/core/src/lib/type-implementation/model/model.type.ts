import { Field } from '../field/field.type';
import { Node } from '../node';

export type Model = Node & {
  fields: Field[];
};

const test: Model = {
  name: 'test',
  fields: [
    {
      name: 'test',
      type: 'float',
      nullable: true,
      label: false,
      unique: false,
      multiple: false,
      searchable: false,
      sortable: false,
      constraint: {},
    },
  ],
};
