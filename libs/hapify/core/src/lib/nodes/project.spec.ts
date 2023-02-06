import { Model } from './model';
import { Project } from './project';

describe('Project', () => {
  describe('constructor', () => {
    it('should create a new instance of Project', () => {
      const project = new Project('MyProject');
      expect(project).toBeInstanceOf(Project);
    });
  });

  describe('models', () => {
    it('should return an empty array', () => {
      const project = new Project('MyProject');
      expect(project.models).toEqual([]);
    });
  });

  describe('addModel', () => {
    it('should add a model to the project', () => {
      const project = new Project('MyProject');
      const model = new Model('MyModel');
      expect(project.addModel(model)).toBe(project); // Test chaining;
      expect(project.models).toEqual([model]);
    });
  });

  describe('removeModel', () => {
    it('should remove a model from the project', () => {
      const project = new Project('MyProject');
      const model = new Model('MyModel');
      project.addModel(model);
      expect(project.removeModel(model)).toBe(project); // Test chaining;
      expect(project.models).toEqual([]);
    });
  });

  describe('metadata', () => {
    it('should return an empty object', () => {
      const project = new Project('MyProject');
      expect(project.metadata).toEqual({});
    });
  });

  describe('addMetadata', () => {
    it('should add a metadata to the project', () => {
      const project = new Project('MyProject');
      expect(project.addMetadata('foo', 'bar')).toBe(project); // Test chaining;
      expect(project.metadata).toEqual({ foo: 'bar' });
    });
  });

  describe('removeMetadata', () => {
    it('should remove a metadata from the project', () => {
      const project = new Project('MyProject');
      project.addMetadata('foo', 'bar');
      expect(project.removeMetadata('foo')).toBe(project); // Test chaining;
      expect(project.metadata).toEqual({});
    });
  });

  describe('hasMetadata', () => {
    it('should return false if no metadata is set', () => {
      const project = new Project('MyProject');
      expect(project.hasMetadata()).toBe(false);
    });

    it('should return false if the metadata does not exist', () => {
      const project = new Project('MyProject');
      project.addMetadata('foo', 'bar');
      expect(project.hasMetadata('baz')).toBe(false);
    });

    it('should return true if the metadata exists', () => {
      const project = new Project('MyProject');
      project.addMetadata('foo', 'bar');
      expect(project.hasMetadata('foo')).toBe(true);
    });
  });

  describe('notes', () => {
    it('should return an empty string', () => {
      const project = new Project('MyProject');
      expect(project.notes).toBe('');
    });
  });

  describe('setNotes', () => {
    it('should set the notes of the project', () => {
      const project = new Project('MyProject');
      expect(project.setNotes('My notes')).toBe(project); // Test chaining;
      expect(project.notes).toBe('My notes');
    });
  });

  describe('clearNotes', () => {
    it('should clear the notes of the project', () => {
      const project = new Project('MyProject');
      project.setNotes('My notes');
      expect(project.clearNotes()).toBe(project); // Test chaining;
      expect(project.notes).toBe('');
    });
  });

  describe('hasNotes', () => {
    it('should return false if no notes are set', () => {
      const project = new Project('MyProject');
      expect(project.hasNotes()).toBe(false);
    });

    it('should return true if notes are set', () => {
      const project = new Project('MyProject');
      project.setNotes('My notes');
      expect(project.hasNotes()).toBe(true);
    });
  });

  describe('name', () => {
    it('should return the name of the project', () => {
      const project = new Project('MyProject');
      expect(project.name).toBe('MyProject');
    });
  });

  describe('plural', () => {
    it("should return the custom plural name if it's defined", () => {
      const project = new Project('MyProject');
      project.setPlural('CustomPluralName');
      expect(project.plural).toBe('CustomPluralName');
    });

    it('should return the default plural name if no custom plural is defined', () => {
      const project = new Project('MyProject');
      expect(project.plural).toBe('MyProjects');
    });
  });
});
