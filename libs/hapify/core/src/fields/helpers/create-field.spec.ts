import { createField } from './create-field';

describe('createField()', () => {
  it('should return expected field shape when specified a valid argument', () => {
    const type = 'string';
    const name = 'fieldName';

    // Supplied constraints object.
    const constraints = { minLength: 0 };

    // Supplied create field options.
    const options = { pluralName: 'fields' };

    expect(createField(type, name, constraints, options)).toEqual({
      type,
      name,
      pluralName: 'fields',
      minLength: 0,
    });
  });

  it('should generate a plural of the provided name', () => {
    expect(createField('string', 'name', {}, {}).pluralName).toBe('names');
  });
});
