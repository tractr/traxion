import { Model } from '../../nodes';

/**
 * Returns the chain of owners of the model.
 * Walks up the tree of owners until it reaches the root.
 * Stops when the owner is undefined.
 * Throws an error if the model is its own owner or in the chain of owners.
 * Returns an empty array if the model has no owner.
 */
export function getOwners(model: Model): Model[] {
  const owners: Model[] = [];
  let { owner } = model;
  while (owner) {
    if (owner === model) {
      throw new Error(`Model ${model.name} is its own owner`);
    }
    if (owners.includes(owner)) {
      throw new Error(`Model ${model.name} is in the chain of owners`);
    }
    owners.push(owner);
    owner = owner.owner;
  }
  return owners;
}

/**
 * Denotes of the model is not a root model.
 */
export function hasOwner(model: Model): boolean {
  return !!model.owner;
}
