import { hasSomeField } from './has-some-field';
import { Model, PrimaryKey } from '../model';

describe('hasSomeField', () => {
  it('should return false if model does not have any field of the requirde type', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [
        { name: 'test', type: 'number', scalar: 'number', pluralName: 'tests' },
      ],
    } satisfies Model;

    const result = hasSomeField(model, 'string');

    expect(result).toBe(false);
  });

  it('should return true if model has at least one field of the requirde type', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [
        { name: 'test', type: 'number', scalar: 'number', pluralName: 'tests' },
        { name: 'test', type: 'string', scalar: 'string', pluralName: 'tests' },
      ],
    } satisfies Model;

    const result = hasSomeField(model, 'string');

    expect(result).toBe(true);
  });
});
