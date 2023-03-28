import { Function } from 'ts-toolbelt';

import { Field } from './field';
import {
  createVirtualField,
  isVirtualField,
  VirtualField,
} from './virtual-field';
import { Relation } from '../models';

describe('createVirtualField', () => {
  it('should create a virtual field', () => {
    const field = createVirtualField('field');

    expect(field).toEqual({
      type: 'virtual',
      name: 'field',
      pluralName: 'fields',
      scalar: null,
    });
  });

  it('should create a virtual field with the provided constraints and options', () => {
    const field = createVirtualField(
      'field',
      { isSortable: true, relation: {} as Function.Narrow<Relation> },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'virtual',
      name: 'field',
      pluralName: 'test',
      scalar: null,
      isSortable: true,
      relation: {},
    });
  });
});

describe('isVirtualField', () => {
  it('should return true if the field is a virtual field', () => {
    const field = {
      type: 'virtual',
      name: 'field',
      pluralName: 'fields',
      scalar: null,
      relation: {} as Relation,
    } satisfies VirtualField;

    expect(isVirtualField(field)).toBeTruthy();
  });

  it('should return false if the field is not a virtual field', () => {
    const field = {
      type: 'string',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
    };

    expect(isVirtualField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is a virtual field', () => {
    const fields: Field[] = [
      {
        type: 'virtual',
        name: 'field',
        pluralName: 'fields',
        scalar: null,
        relation: {} as Relation,
      },
      {
        type: 'string',
        name: 'field',
        pluralName: 'fields',
        scalar: 'string',
      },
    ];

    const virtualFields = fields.filter(isVirtualField);

    expect(virtualFields).toEqual([
      {
        type: 'virtual',
        name: 'field',
        pluralName: 'fields',
        scalar: null,
        relation: {},
      },
    ]);
  });
});
