import { createField } from './create-field';
import { StringConstraints } from '../string-field';

describe('createField()', () => {
  it('should return expected field shape when specified a valid argument', () => {
    const type = 'string';
    const name = 'field';

    // Supplied constraints object.
    const constraints: StringConstraints = { minLength: 0, scalar: 'string' };

    // Supplied create field options.
    const options = { pluralName: 'fields' };

    const result = createField(type, name, constraints, options);

    expect(result).toEqual({
      type,
      name,
      scalar: 'string',
      pluralName: 'fields',
      minLength: 0,
    });
  });

  it('should generate a plural of the provided name', () => {
    const type = 'string';
    const name = 'field';

    // Supplied constraints object.
    const constraints: StringConstraints = { scalar: 'string' };

    const result = createField(type, name, constraints);

    expect(result.pluralName).toEqual('fields');
  });
});
