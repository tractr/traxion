import {
  getRelatedModels,
  getRelatedModelsWithoutSelf,
  getRelations,
} from './relation.helpers';
import { Field } from '../../fields';
import { Model, PrimaryKey, Relation } from '../model';

describe('getRelations', () => {
  it('should return an empty array if model has no relation', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [
        { name: 'test', type: 'number', scalar: 'number', pluralName: 'tests' },
      ],
    } satisfies Model;

    const result = getRelations(model);

    expect(result).toEqual([]);
  });

  it('should return an array of relations if model has relations', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [
        {
          name: 'relationField1',
          type: 'virtual',
          scalar: null,
          foreign: null,
          pluralName: 'tests',
          relation: { name: 'relation1' } as Relation,
        },
        {
          name: 'relationField2',
          type: 'virtual',
          scalar: null,
          foreign: null,
          pluralName: 'tests',
          relation: { name: 'relation2' } as Relation,
        },
      ],
    } satisfies Model;

    const result = getRelations(model);

    expect(result).toEqual([{ name: 'relation1' }, { name: 'relation2' }]);
  });
  it('should return an array of relations if model has relations', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [
        {
          name: 'relationField1',
          type: 'virtual',
          scalar: null,
          pluralName: 'tests',
          foreign: null,
          relation: { name: 'relation1' } as Relation,
        },
        {
          name: 'relationField2',
          type: 'virtual',
          scalar: null,
          foreign: null,
          pluralName: 'tests',
          relation: { name: 'relation2' } as Relation,
        },
      ],
    } satisfies Model;

    const result = getRelations(model);

    expect(result).toEqual([{ name: 'relation1' }, { name: 'relation2' }]);
  });
});

describe('getRelatedModels', () => {
  it('should return all the models that are related to a model', () => {
    const modelA = {
      name: 'testA',
      pluralName: 'testsA',
      primaryKey: null,
      fields: [],
    };

    const modelB = {
      name: 'testB',
      pluralName: 'testsB',
      primaryKey: null,
      fields: [],
    };

    const modelC = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [] as Field[],
    } satisfies Model;

    modelC.fields.push(
      {
        name: 'relationField1',
        type: 'virtual',
        scalar: null,
        pluralName: 'tests',
        foreign: null,
        relation: {
          name: 'relation1',
          from: { model: modelC },
          to: { model: modelA },
        } as unknown as Relation,
      },
      {
        name: 'relationField2',
        type: 'virtual',
        scalar: null,
        pluralName: 'tests',
        foreign: null,
        relation: {
          name: 'relation2',
          from: { model: modelB },
          to: { model: modelC },
        } as unknown as Relation,
      },
    );

    const result = getRelatedModels(modelC);

    expect(result).toEqual([modelA, modelB]);
  });

  it('should include the model itself if their is a self relation', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [] as Field[],
    } satisfies Model;

    model.fields.push(
      {
        name: 'relationField1',
        type: 'virtual',
        scalar: null,
        foreign: null,
        pluralName: 'tests',
        relation: {
          name: 'relation1',
          from: { model },
          to: { model },
        } as unknown as Relation,
      },
      {
        name: 'relationField2',
        type: 'virtual',
        scalar: null,
        pluralName: 'tests',
        foreign: null,
        relation: {
          name: 'relation2',
          from: { model },
          to: { model },
        } as unknown as Relation,
      },
    );

    const result = getRelatedModels(model);

    expect(result).toEqual([model]);
  });

  it('should return an empty array if model has no relation', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [
        { name: 'test', type: 'number', scalar: 'number', pluralName: 'tests' },
      ],
    } satisfies Model;

    const result = getRelatedModels(model);

    expect(result).toEqual([]);
  });

  it('should throw an error on invalid relation', () => {
    const modelA = {
      name: 'testA',
      pluralName: 'testsA',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [],
    } satisfies Model;

    const modelB = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [] as Field[],
    } satisfies Model;

    modelB.fields.push({
      name: 'relationField1',
      type: 'virtual',
      scalar: null,
      pluralName: 'tests',
      foreign: null,
      relation: {
        name: 'relation1',
        from: { model: modelA },
        to: { model: modelA },
      } as unknown as Relation,
    });

    expect(() => getRelatedModels(modelB)).toThrow();
  });
});

describe('getRelatedModelsWithoutSelf', () => {
  it('should return all the models that are related to a model without the model itself', () => {
    const modelA = {
      name: 'testA',
      pluralName: 'testsA',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [] as Field[],
    };

    const modelB = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: {} as PrimaryKey,
      dbName: null,
      fields: [] as Field[],
    } satisfies Model;

    modelB.fields.push(
      {
        name: 'relationField1',
        type: 'virtual',
        foreign: null,
        scalar: null,
        pluralName: 'tests',
        relation: {
          name: 'relation1',
          from: { model: modelB },
          to: { model: modelA },
        } as unknown as Relation,
      },
      {
        name: 'relationField2',
        type: 'virtual',
        scalar: null,
        foreign: null,
        pluralName: 'tests',
        relation: {
          name: 'relation2',
          from: { model: modelB },
          to: { model: modelB },
        } as unknown as Relation,
      },
    );

    const result = getRelatedModelsWithoutSelf(modelB);

    expect(result).toEqual([modelA]);
  });
});
