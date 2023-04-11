import { Function } from 'ts-toolbelt';

import { Field } from './field';
import {
  createForeignField,
  ForeignField,
  isForeignField,
} from './foreign-field';
import { Relation } from '../models';

describe('createForeignField', () => {
  it('should create a foreign field', () => {
    const field = createForeignField('name');

    expect(field).toEqual({
      type: 'foreign',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    });
  });

  it('should init the foreign field with the provided constraints and options', () => {
    const field = createForeignField(
      'name',
      { isSortable: true, relation: {} as Function.Narrow<Relation> },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'foreign',
      name: 'name',
      pluralName: 'test',
      scalar: 'string',
      isSortable: true,
      relation: {},
    });
  });
});

describe('isForeignField', () => {
  it('should return true if the field is a foreign field', () => {
    const field = {
      type: 'foreign',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
      relation: {} as Relation,
    } satisfies ForeignField;

    expect(isForeignField(field)).toBeTruthy();
  });

  it('should return false if the field is not a foreign field', () => {
    const field = {
      type: 'string',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    };

    expect(isForeignField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is a foreign field', () => {
    const fields: Field[] = [
      {
        type: 'foreign',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
        relation: {} as Relation,
      },
      {
        type: 'string',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
      },
    ];

    const result: ForeignField[] = fields.filter(isForeignField);

    expect(result).toEqual([
      {
        type: 'foreign',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
        relation: {},
      },
    ]);
  });
});
