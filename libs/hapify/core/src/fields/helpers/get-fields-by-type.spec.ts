import { getFieldsByType } from './get-fields-by-type';
import type { Field } from '../field';
import type { StringField } from '../string-field';

describe('getFieldsByType', () => {
  it('should return an empty array if no field matches the type', () => {
    const fields = [
      {
        type: 'string',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
        isSearchable: true,
        isSortable: false,
      },
      {
        type: 'number',
        name: 'age',
        pluralName: 'ages',
        scalar: 'number',
        isSearchable: false,
        isSortable: true,
      },
    ] satisfies Field[];

    const result = getFieldsByType(fields, 'boolean');

    expect(result).toHaveLength(0);
  });

  it('should return an array of fields matching the type', () => {
    const fields = [
      {
        type: 'string',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
        isSearchable: true,
        isSortable: false,
      },
      {
        type: 'number',
        name: 'age',
        pluralName: 'ages',
        scalar: 'number',
        isSearchable: false,
        isSortable: true,
      },
    ] satisfies Field[];

    const result: StringField[] = getFieldsByType(fields, 'string');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(fields[0]);
  });
});
