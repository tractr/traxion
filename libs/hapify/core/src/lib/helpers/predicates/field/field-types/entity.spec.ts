import {
  EntityManyToManyField,
  EntityManyToOneField,
  EntityOneToManyField,
  EntityOneToOneField,
  Model,
  StringBasicField,
} from '../../../../nodes';
import {
  isEntity,
  isManyToMany,
  isManyToOne,
  isOneToMany,
  isOneToOne,
} from './entity';

describe('isManyToMany', () => {
  it('should return true', () => {
    expect(
      isManyToMany(new EntityManyToManyField('test', new Model('User'))),
    ).toBe(true);
  });

  it('should return false', () => {
    expect(
      isManyToMany(new EntityManyToOneField('test', new Model('User'))),
    ).toBe(false);
  });
});

describe('isManyToOne', () => {
  it('should return true', () => {
    expect(
      isManyToOne(new EntityManyToOneField('test', new Model('User'))),
    ).toBe(true);
  });

  it('should return false', () => {
    expect(
      isManyToOne(new EntityManyToManyField('test', new Model('User'))),
    ).toBe(false);
  });
});

describe('isOneToMany', () => {
  it('should return true', () => {
    expect(
      isOneToMany(new EntityOneToManyField('test', new Model('User'))),
    ).toBe(true);
  });

  it('should return false', () => {
    expect(
      isOneToMany(new EntityManyToManyField('test', new Model('User'))),
    ).toBe(false);
  });
});

describe('isOneToOne', () => {
  it('should return true', () => {
    expect(isOneToOne(new EntityOneToOneField('test', new Model('User')))).toBe(
      true,
    );
  });
  it('should return false', () => {
    expect(
      isOneToOne(new EntityManyToManyField('test', new Model('User'))),
    ).toBe(false);
  });
});

describe('isEntity', () => {
  it('should return true', () => {
    expect(isEntity(new EntityManyToManyField('test', new Model('User')))).toBe(
      true,
    );
    expect(isEntity(new EntityManyToOneField('test', new Model('User')))).toBe(
      true,
    );
    expect(isEntity(new EntityOneToManyField('test', new Model('User')))).toBe(
      true,
    );
    expect(isEntity(new EntityOneToOneField('test', new Model('User')))).toBe(
      true,
    );
  });
  it('should return false', () => {
    expect(isEntity(new StringBasicField('test'))).toBe(false);
  });
});
