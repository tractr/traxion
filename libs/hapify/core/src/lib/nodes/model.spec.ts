import { EntityOneToOneField, StringBasicField } from './fields';
import { Model } from './model';

describe('Model', () => {
  describe('constructor', () => {
    it('should create a new model', () => {
      const model = new Model('User');
      expect(model).toBeInstanceOf(Model);
    });
  });

  describe('name', () => {
    it('should return the name of the model', () => {
      const model = new Model('User');
      expect(model.name).toEqual('User');
    });
  });

  describe('addField', () => {
    it('should add a field to the model', () => {
      const model = new Model('User');
      const field = new StringBasicField('name');
      model.addField(field);
      expect(model.fields).toEqual([field]);
    });

    it('should not add the same field twice', () => {
      const model = new Model('User');
      const field = new StringBasicField('name');
      model.addField(field);
      model.addField(field);
      expect(model.fields).toEqual([field]);
    });
  });

  describe('removeField', () => {
    it('should remove a field from the model', () => {
      const model = new Model('User');
      const field = new StringBasicField('name');
      model.addField(field);
      model.removeField(field);
      expect(model.fields).toEqual([]);
    });
  });

  describe('fields & fieldsCount', () => {
    it('should return the list of fields in the model', () => {
      const model = new Model('User');
      const field = new StringBasicField('name');
      model.addField(field);
      expect(model.fields).toEqual([field]);
      expect(model.fieldsCount).toEqual(1);
    });

    it('should return an empty list if no fields are present', () => {
      const model = new Model('User');
      expect(model.fields).toEqual([]);
      expect(model.fieldsCount).toEqual(0);
    });
  });

  describe('entityFields, dependencies & references', () => {
    it('should find no dependencies nor references if no entity fields are present', () => {
      const model = new Model('User');
      expect(model.dependencies).toEqual([]);
      expect(model.referencedIn).toEqual([]);
      expect(model.hasDependencies).toEqual(false);
      expect(model.isSelfDependent).toEqual(false);
      expect(model.isReferenced).toEqual(false);
      expect(model.isSelfReferenced).toEqual(false);
    });

    it('should add an entity field to the model and add the model to the list of referenced models and dependencies', () => {
      const userModel = new Model('User');
      const shopModel = new Model('Shop');
      const field = new EntityOneToOneField('shop', shopModel);
      userModel.addField(field);
      expect(shopModel.referencedIn).toEqual([userModel]);
      expect(userModel.dependencies).toEqual([shopModel]);

      expect(userModel.isSelfDependent).toBe(false);
      expect(shopModel.isSelfDependent).toBe(false);

      expect(userModel.hasDependencies).toBe(true);
      expect(shopModel.hasDependencies).toBe(false);

      expect(userModel.isReferenced).toBe(false);
      expect(shopModel.isReferenced).toBe(true);

      expect(userModel.isSelfReferenced).toBe(false);
      expect(shopModel.isSelfReferenced).toBe(false);
    });

    it('should remove model from dependencies and referenced models if an entity field is removed', () => {
      const userModel = new Model('User');
      const shopModel = new Model('Shop');
      const field = new EntityOneToOneField('shop', shopModel);
      userModel.addField(field);
      userModel.removeField(field);
      expect(userModel.dependencies).toEqual([]);
      expect(shopModel.referencedIn).toEqual([]);

      expect(userModel.isSelfDependent).toBe(false);
      expect(shopModel.isSelfDependent).toBe(false);

      expect(userModel.hasDependencies).toBe(false);
      expect(shopModel.hasDependencies).toBe(false);

      expect(userModel.isReferenced).toBe(false);
      expect(shopModel.isReferenced).toBe(false);

      expect(userModel.isSelfReferenced).toBe(false);
      expect(shopModel.isSelfReferenced).toBe(false);
    });

    it('should not add the same model twice to the list of dependencies and referenced models', () => {
      const userModel = new Model('User');
      const shopModel = new Model('Shop');
      const field = new EntityOneToOneField('shop', shopModel);
      userModel.addField(field);
      userModel.addField(field);
      expect(shopModel.referencedIn).toEqual([userModel]);
      expect(userModel.dependencies).toEqual([shopModel]);
    });

    it('should be able to add a self-referencing entity field', () => {
      const userModel = new Model('User');
      const field = new EntityOneToOneField('user', userModel);
      userModel.addField(field);
      expect(userModel.dependencies).toEqual([]); // Exclude self-references
      expect(userModel.referencedIn).toEqual([userModel]);

      expect(userModel.isSelfDependent).toBe(true);
      expect(userModel.hasDependencies).toBe(true);
      expect(userModel.isReferenced).toBe(true);
      expect(userModel.isSelfReferenced).toBe(true);
    });
  });

  describe('setActionScope', () => {
    it('should set the scope of an action', () => {
      const model = new Model('User');
      const scope = 'system';
      model.setActionScope('create', scope);
      expect(model.actionsScopes.create).toEqual(scope);
    });
  });

  describe('setActionsScopes & actionsScopes', () => {
    it('should set the scopes of many actions', () => {
      const model = new Model('User');
      const scope = 'system';
      model.setActionsScopes({ create: scope });
      expect(model.actionsScopes.create).toEqual(scope);
    });
    it('should not override existing scopes', () => {
      const model = new Model('User');
      model.setActionScope('create', 'system');
      model.setActionScope('read', 'system');
      model.setActionScope('update', 'system');
      model.setActionsScopes({ create: 'auth' });
      expect(model.actionsScopes.create).toEqual('auth');
      expect(model.actionsScopes.read).toEqual('system');
      expect(model.actionsScopes.update).toEqual('system');
    });
    it('actionsScopes should be immutable', () => {
      const model = new Model('User');
      const scopes = model.actionsScopes;
      expect(scopes.delete).not.toEqual('system');
      scopes.delete = 'system';
      expect(scopes.delete).toEqual('system');
      expect(model.actionsScopes.delete).not.toEqual('system');
    });
  });

  describe('setOwner & owner', () => {
    it('should set the owner of the model', () => {
      const model = new Model('Shop');
      const owner = new Model('User');
      model.setOwner(owner);
      expect(model.owner).toEqual(owner);
    });
  });

  describe('removeOwner', () => {
    it('should remove the owner of the model', () => {
      const model = new Model('Shop');
      const owner = new Model('User');
      model.setOwner(owner);
      model.removeOwner();
      expect(model.owner).toBeUndefined();
    });
  });
});
