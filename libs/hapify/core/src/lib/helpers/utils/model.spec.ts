import { Model } from '../../nodes';
import { getOwners } from './model';

describe('getOwners', () => {
  it('should returns the list of owners', () => {
    // Create a chain of owners
    const model1 = new Model('Model1');
    const model2 = new Model('Model2');
    const model3 = new Model('Model3');
    const model4 = new Model('Model4');

    model1.setOwner(model2);
    model2.setOwner(model3);
    model4.setOwner(model3);

    // Check the chain of owners
    expect(getOwners(model1)).toEqual([model2, model3]);
  });
  it('should throw an error if the model is its own owner', () => {
    const model = new Model('Model');
    model.setOwner(model);
    expect(() => getOwners(model)).toThrow();
  });
  it('should throw an error if the model is in the chain of owners', () => {
    const model1 = new Model('Model1');
    const model2 = new Model('Model2');
    const model3 = new Model('Model3');
    const model4 = new Model('Model4');

    model1.setOwner(model2);
    model2.setOwner(model3);
    model3.setOwner(model4);
    model4.setOwner(model1);

    expect(() => getOwners(model1)).toThrow();
  });
  it('should return an empty array if the model has no owner', () => {
    const model = new Model('Model');
    expect(getOwners(model)).toEqual([]);
  });
});
