import { EntityOneToOneField, Model } from '../../../nodes';
import {
  hasDependencies,
  isReferenced,
  isSelfDependent,
  isSelfReferenced,
} from './dependency';

describe('hasDependencies', () => {
  it('should return true if the model has dependencies', () => {
    const model = new Model('User');
    model.addField(new EntityOneToOneField('field', new Model('Shop')));
    expect(hasDependencies(model)).toBe(true);
  });
  it('should return false if the model has no dependencies', () => {
    const model = new Model('User');
    expect(hasDependencies(model)).toBe(false);
  });
});

describe('isSelfDependent', () => {
  it('should return true if the model is self-dependent', () => {
    const model = new Model('User');
    model.addField(new EntityOneToOneField('field', model));
    expect(isSelfDependent(model)).toBe(true);
  });
  it('should return false if the model is not self-dependent', () => {
    const model = new Model('User');
    expect(isSelfDependent(model)).toBe(false);
  });
});

describe('isReferenced', () => {
  it('should return true if the model is referenced', () => {
    const model = new Model('User');
    const shop = new Model('Shop');
    model.addField(new EntityOneToOneField('field', shop));
    expect(isReferenced(shop)).toBe(true);
  });
  it('should return false if the model is not referenced', () => {
    const model = new Model('User');
    expect(isReferenced(model)).toBe(false);
  });
});

describe('isSelfReferenced', () => {
  it('should return true if the model is self-referenced', () => {
    const model = new Model('User');
    model.addField(new EntityOneToOneField('field', model));
    expect(isSelfReferenced(model)).toBe(true);
  });
  it('should return false if the model is not self-referenced', () => {
    const model = new Model('User');
    expect(isSelfReferenced(model)).toBe(false);
  });
});
