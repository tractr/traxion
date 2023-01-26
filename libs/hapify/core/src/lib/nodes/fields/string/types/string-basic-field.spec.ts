import { StringBasicField } from './string-basic-field';

describe('BaseField', () => {
  describe('primary', () => {
    it('should be false by default', () => {
      const field = new StringBasicField('test');
      expect(field.primary).toBe(false);
    });

    it('should be set to true when calling setPrimary with true', () => {
      const field = new StringBasicField('test');
      field.setPrimary(true);
      expect(field.primary).toBe(true);
    });
  });

  describe('unique', () => {
    it('should be false by default', () => {
      const field = new StringBasicField('test');
      expect(field.unique).toBe(false);
    });

    it('should be set to true when calling setUnique with true', () => {
      const field = new StringBasicField('test');
      field.setUnique(true);
      expect(field.unique).toBe(true);
    });
  });

  describe('label', () => {
    it('should be false by default', () => {
      const field = new StringBasicField('test');
      expect(field.label).toBe(false);
    });

    it('should be set to true when calling setLabel with true', () => {
      const field = new StringBasicField('test');
      field.setLabel(true);
      expect(field.label).toBe(true);
    });
  });

  describe('nullable', () => {
    it('should be false by default', () => {
      const field = new StringBasicField('test');
      expect(field.nullable).toBe(false);
    });

    it('should be set to true when calling setNullable with true', () => {
      const field = new StringBasicField('test');
      field.setNullable(true);
      expect(field.nullable).toBe(true);
    });
  });

  describe('multiple', () => {
    it('should be false by default', () => {
      const field = new StringBasicField('test');
      expect(field.multiple).toBe(false);
    });

    it('should be set to true when calling setMultiple with true', () => {
      const field = new StringBasicField('test');
      field.setMultiple(true);
      expect(field.multiple).toBe(true);
    });
  });

  describe('searchable', () => {
    it('should be false by default', () => {
      const field = new StringBasicField('test');
      expect(field.searchable).toBe(false);
    });

    it('should be set to true when calling setSearchable with true', () => {
      const field = new StringBasicField('test');
      field.setSearchable(true);
      expect(field.searchable).toBe(true);
    });
  });

  describe('sortable', () => {
    it('should be false by default', () => {
      const field = new StringBasicField('test');
      expect(field.sortable).toBe(false);
    });

    it('should be set to true when calling setSortable with true', () => {
      const field = new StringBasicField('test');
      field.setSortable(true);
      expect(field.sortable).toBe(true);
    });
  });

  describe('setActionScope', () => {
    it('should be undefined par default', () => {
      const field = new StringBasicField('test');
      expect(field.actionsScopes.read).toBeUndefined();
      expect(field.actionsScopes.write).toBeUndefined();
    });
    it('should set the action scope', () => {
      const field = new StringBasicField('test');
      field.setActionScope('read', 'system');
      expect(field.actionsScopes).toStrictEqual({
        read: 'system',
        write: undefined,
      });
    });
  });

  describe('setActionsScopes & actionsScopes', () => {
    it('should set the scopes of many actions', () => {
      const field = new StringBasicField('test');
      field.setActionsScopes({
        read: 'system',
        write: 'system',
      });
      expect(field.actionsScopes).toStrictEqual({
        read: 'system',
        write: 'system',
      });
    });

    it('should not override existing scopes', () => {
      const field = new StringBasicField('test');
      field.setActionScope('read', 'system');
      field.setActionsScopes({
        read: 'public',
        write: 'system',
      });
      expect(field.actionsScopes).toStrictEqual({
        read: 'public',
        write: 'system',
      });
    });

    it('actionsScopes should be immutable', () => {
      const field = new StringBasicField('test');
      field.setActionScope('read', 'system');
      field.actionsScopes.read = 'public';
      expect(field.actionsScopes).toStrictEqual({
        read: 'system',
        write: undefined,
      });
    });
  });

  describe('makeNotReadable', () => {
    it('should set the read scope to "none"', () => {
      const field = new StringBasicField('test');
      field.makeNotReadable();
      expect(field.actionsScopes.read).toBe('system');
    });
  });

  describe('makeNotWritable', () => {
    it('should set the write scope to "none"', () => {
      const field = new StringBasicField('test');
      field.makeNotWritable();
      expect(field.actionsScopes.write).toBe('system');
    });
  });
});

describe('BaseStringField', () => {
  describe('defaultValue', () => {
    it('should be undefined by default', () => {
      const field = new StringBasicField('test');
      expect(field.defaultValue).toBeUndefined();
    });

    it('should be set to a value when calling setDefaultValue with a value', () => {
      const field = new StringBasicField('test');
      field.setDefaultValue('test');
      expect(field.defaultValue).toBe('test');
    });
  });

  describe('minLength', () => {
    it('should be undefined by default', () => {
      const field = new StringBasicField('test');
      expect(field.minLength).toBeUndefined();
    });

    it('should be set to a value when calling setMinLength with a value', () => {
      const field = new StringBasicField('test');
      field.setMinLength(3);
      expect(field.minLength).toBe(3);
    });
  });

  describe('maxLength', () => {
    it('should be undefined by default', () => {
      const field = new StringBasicField('test');
      expect(field.maxLength).toBeUndefined();
    });

    it('should be set to a value when calling setMaxLength with a value', () => {
      const field = new StringBasicField('test');
      field.setMaxLength(3);
      expect(field.maxLength).toBe(3);
    });
  });
});

describe('StringBasicField', () => {
  it('should have the correct type and subType', () => {
    const field = new StringBasicField('test');
    expect(field.type).toBe('string');
    expect(field.subType).toBe('basic');
  });
});
