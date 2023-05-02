import { hasSomeFieldFactory } from './has-some-field-factory';
import { Model } from '../model';

describe('HasSomeFieldFactory', () => {
  it('should return a function', () => {
    const type = 'string';

    const hasSomeStringField = hasSomeFieldFactory(type);

    expect(hasSomeStringField).toBeInstanceOf(Function);
  });

  it('should return a function that returns false if param is not a model', () => {
    const type = 'string';
    const notAModel = {};

    const hasSomeStringField = hasSomeFieldFactory(type);

    expect(hasSomeStringField(notAModel)).toBe(false);
  });

  it('should return a function that returns false if param is a model that does not have a field of the required type', () => {
    const type = 'string';

    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [],
    } satisfies Model;

    const hasSomeStringField = hasSomeFieldFactory(type);

    expect(hasSomeStringField(model)).toBe(false);
  });

  it('should return a function that returns true if param is a model that has a field of the required type', () => {
    const type = 'string';

    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          type: 'string',
          name: 'field',
          pluralName: 'fields',
          scalar: 'string',
        },
      ],
    } satisfies Model;

    const hasSomeStringField = hasSomeFieldFactory(type);

    expect(hasSomeStringField(model)).toBe(true);
  });
});
