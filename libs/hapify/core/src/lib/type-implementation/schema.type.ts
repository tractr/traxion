import { VirtualField } from '../nodes';
import {
  Field,
  foreignField,
  ForeignKeyField,
  IsConstraints,
  isField,
  PrimaryKeyField,
  virtualField,
  VirtualRelationField,
} from './field.type';

/**
 * Traxion models
 */

export type Schema = {
  models: Model[];
  relations: Relation[];
};

export type Relation = OneManyRelation | ManyManyRelation | OneOneRelation;

export type OneManyRelation = {
  type: 'oneMany';
  name: string;
  from: {
    model: Model;
    virtual: VirtualRelationField;
  };
  to: {
    model: Model;
    foreign: ForeignKeyField;
    virtual: VirtualRelationField;
  };
};

export type ManyManyRelation = {
  type: 'manyMany';
  name: string;
  from: {
    model: Model;
    virtual: VirtualRelationField;
  };
  to: {
    model: Model;
    virtual: VirtualRelationField;
  };
};

export type OneOneRelation = {
  type: 'manyMany';
  name: string;
  from: {
    model: Model;
    virtual: VirtualRelationField;
  };
  to: {
    model: Model;
    foreign: IsConstraints<ForeignKeyField, 'isUnique'>;
    virtual: VirtualRelationField;
  };
};

/**
 * The model type
 */
export type Model = {
  name: string;
  fields: Field[];
  primary: PrimaryKeyField[];
};

export function createOneManyRelation(
  name: string,
  from: { model: Model; virtual: VirtualField | string },
  to: {
    model: Model;
    foreign: ForeignKeyField | string;
    virtual: VirtualField | string;
  },
) {
  const fromVirtualField: VirtualField = isVirtualField(from.virtual)
    ? from.virtual
    : virtualField(from.virtual);

  const toVirtualField: VirtualField = isVirtualField(to.virtual)
    ? to.virtual
    : virtualField(to.virtual);

  const toForeignKeyField: ForeignKeyField = isForeignField(to.foreign)
    ? to.foreign
    : foreignField(to.foreign);

  const relation: OneManyRelation = {
    type: 'oneMany',
    name,
    from: {
      model: from.model,
      virtual: fromVirtualField,
    },
    to: {
      model: to.model,
      foreign: toForeignKeyField,
      virtual: toVirtualField,
    },
  };

  fromVirtualField.relation = relation;
  from.model.fields.push(fromVirtualField);

  toForeignKeyField.relation = relation;
  toVirtualField.relation = relation;

  to.model.fields.push(toForeignKeyField);
  to.model.fields.push(toForeignKeyField);
  to.model.fields.push(toVirtualField);

  return relation;
}
