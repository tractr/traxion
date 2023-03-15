import {
  foreignField,
  ForeignField,
  virtualField,
  VirtualField,
} from '../../fields';
import { Model, OneManyRelation } from '../model';

export function createOneManyRelation(
  name: string,
  from: { model: Model; virtual: VirtualField | string },
  to: {
    model: Model;
    foreign: (ForeignField | string)[];
    virtual: VirtualField | string;
  },
) {
  const fromVirtualField =
    typeof from.virtual === 'string'
      ? virtualField(from.virtual)
      : from.virtual;

  const toVirtualField: VirtualField =
    typeof to.virtual === 'string' ? virtualField(to.virtual) : to.virtual;

  let toForeignField: ForeignField[] = to.foreign.map((field) =>
    typeof field === 'string' ? foreignField(field) : field,
  );

  const relation: OneManyRelation = {
    type: 'oneMany',
    name,
    from: {
      model: from.model,
      virtual: fromVirtualField,
    },
    to: {
      model: to.model,
      foreign: toForeignField,
      virtual: toVirtualField,
    },
  };

  fromVirtualField.relation = relation;
  from.model.fields.push(fromVirtualField);

  toForeignField = toForeignField.map((field) => ({
    ...field,
    relation,
  }));
  toVirtualField.relation = relation;

  to.model.fields.push(...toForeignField);
  to.model.fields.push(toVirtualField);

  return relation;
}
