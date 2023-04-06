import { Model } from '../model';
import { isModel } from './is-model';

describe('isModel', () => {
  it('should return true if model is valid', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [],
    } satisfies Model;

    expect(isModel(model)).toBe(true);
  });

  it('should return false if model is not an object', () => {
    const model = 'test';

    expect(isModel(model)).toBe(false);
  });

  it('should return false if model does not have a name property', () => {
    const model = {
      pluralName: 'tests',
      primaryKey: null,
      fields: [],
    };

    expect(isModel(model)).toBe(false);
  });

  it('should return false if model name is not a string', () => {
    const model = {
      name: 123,
      pluralName: 'tests',
      primaryKey: null,
      fields: [],
    };

    expect(isModel(model)).toBe(false);
  });

  it('should return false if model does not have a pluralName property', () => {
    const model = {
      name: 'test',
      primaryKey: null,
      fields: [],
    };

    expect(isModel(model)).toBe(false);
  });

  it('should return false if model pluralName is not a string', () => {
    const model = {
      name: 'test',
      pluralName: 123,
      primaryKey: null,
      fields: [],
    };

    expect(isModel(model)).toBe(false);
  });

  it('should return false if model does not have a primaryKey property', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      fields: [],
    };

    expect(isModel(model)).toBe(false);
  });

  it('should return false if model primaryKey is not null or an object', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: 'test',
      fields: [],
    };

    expect(isModel(model)).toBe(false);
  });

  it('should return false if model does not have a fields property', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
    };

    expect(isModel(model)).toBe(false);
  });
});
