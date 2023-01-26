import { Model } from '../../../nodes';
import { hasOwner } from './owner';

describe('hasOwner', () => {
  it('should return true if the model has an owner', () => {
    const model = new Model('User');
    model.setOwner(new Model('Owner'));
    expect(hasOwner(model)).toBe(true);
  });
  it('should return false if the model has no owner', () => {
    const model = new Model('User');
    expect(hasOwner(model)).toBe(false);
  });
});
