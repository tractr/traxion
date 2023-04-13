import { createFileField, FileField, isFileField } from './file-field';

describe('createFileField', () => {
  it('should create a file field', () => {
    const field = createFileField('name');

    expect(field).toEqual({
      type: 'file',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    });
  });

  it('should init the file field with the provided constraints and options', () => {
    const field = createFileField(
      'name',
      { isSortable: true },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'file',
      name: 'name',
      pluralName: 'test',
      scalar: 'string',
      isSortable: true,
    });
  });
});

describe('isFileField', () => {
  it('should return true if the field is a file field', () => {
    const field = {
      type: 'file',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    } satisfies FileField;

    expect(isFileField(field)).toBeTruthy();
  });

  it('should return false if the field is not a file field', () => {
    const field = {
      type: 'string',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    };

    expect(isFileField(field)).not.toBeTruthy();
  });

  it('should narrow the type of the field if it is a file field', () => {
    const fields = [
      {
        type: 'file',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
      },
      {
        type: 'string',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
      },
    ];

    const fileFields: FileField[] = fields.filter(isFileField);

    expect(fileFields).toHaveLength(1);
    expect(fileFields[0]).toEqual({
      type: 'file',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    });
  });
});
