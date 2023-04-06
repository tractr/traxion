import {
  hasSomeBooleanField,
  hasSomeDateField,
  hasSomeEnumField,
  hasSomeFileField,
  hasSomeForeignField,
  hasSomeNumberField,
  hasSomeObjectField,
  hasSomePrimaryField,
  hasSomeStringField,
  hasSomeVirtualField,
  Model,
  Relation,
} from './model';

describe('hasSomeBooleanField', () => {
  it('should return false if model has no boolean field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
      ],
    } satisfies Model;

    const result = hasSomeBooleanField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one boolean field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'boolean',
          type: 'boolean',
        },
      ],
    } satisfies Model;

    const result = hasSomeBooleanField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeDateField', () => {
  it('should return false if model has no date field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
      ],
    } satisfies Model;

    const result = hasSomeDateField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one date field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'date',
          type: 'date',
        },
      ],
    } satisfies Model;

    const result = hasSomeDateField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeEnumField', () => {
  it('should return false if model has no enum field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
      ],
    } satisfies Model;

    const result = hasSomeEnumField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one enum field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'string',
          type: 'enum',
          enum: { name: 'enum', values: { test: 'test' } },
        },
      ],
    } satisfies Model;

    const result = hasSomeEnumField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeFileField', () => {
  it('should return false if model has no file field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
      ],
    } satisfies Model;

    const result = hasSomeFileField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one file field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'string',
          type: 'file',
        },
      ],
    } satisfies Model;

    const result = hasSomeFileField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeForeignField', () => {
  it('should return false if model has no foreign field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
      ],
    } satisfies Model;

    const result = hasSomeForeignField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one foreign field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'number',
          type: 'number',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'string',
          type: 'foreign',
          relation: {} as Relation,
        },
      ],
    } satisfies Model;

    const result = hasSomeForeignField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeNumberField', () => {
  it('should return false if model has no number field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
      ],
    } satisfies Model;

    const result = hasSomeNumberField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one number field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'number',
          type: 'number',
        },
      ],
    } satisfies Model;

    const result = hasSomeNumberField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeObjectField', () => {
  it('should return false if model has no object field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
      ],
    } satisfies Model;

    const result = hasSomeObjectField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one object field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'object',
          type: 'object',
        },
      ],
    } satisfies Model;

    const result = hasSomeObjectField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomePrimaryField', () => {
  it('should return false if model has no primary field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
      ],
    } satisfies Model;

    const result = hasSomePrimaryField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one primary field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'string',
          scalar: 'string',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'string',
          type: 'primary',
          relations: [],
        },
      ],
    } satisfies Model;

    const result = hasSomePrimaryField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeStringField', () => {
  it('should return false if model has no string field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'number',
          scalar: 'number',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
      ],
    } satisfies Model;

    const result = hasSomeStringField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one string field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'number',
          scalar: 'number',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: 'string',
          type: 'string',
        },
      ],
    } satisfies Model;

    const result = hasSomeStringField(model);

    expect(result).toEqual(true);
  });
});

describe('hasSomeVirtualField', () => {
  it('should return false if model has no virtual field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'number',
          scalar: 'number',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
      ],
    } satisfies Model;

    const result = hasSomeVirtualField(model);

    expect(result).toEqual(false);
  });

  it('should return true if model has at least one virtual field', () => {
    const model = {
      name: 'test',
      pluralName: 'tests',
      primaryKey: null,
      fields: [
        {
          name: 'field1',
          pluralName: 'field1s',
          type: 'number',
          scalar: 'number',
        },
        {
          name: 'field2',
          pluralName: 'field2s',
          scalar: 'boolean',
          type: 'boolean',
        },
        {
          name: 'field3',
          pluralName: 'field3s',
          scalar: null,
          type: 'virtual',
          relation: {} as Relation,
        },
      ],
    } satisfies Model;

    const result = hasSomeVirtualField(model);

    expect(result).toEqual(true);
  });
});
