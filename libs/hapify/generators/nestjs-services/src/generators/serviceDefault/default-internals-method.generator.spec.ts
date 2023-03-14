import { generateDefaultInternalsMethod } from './default-internals-method.generator';

describe('generateDefaultInternalsMethod', () => {
  const [getDefaultInternals] = generateDefaultInternalsMethod();

  describe('getDefaultInternals', () => {
    it('generates a method declaration with the correct name', () => {
      expect(getDefaultInternals.name).toEqual('getDefaultInternals');
    });

    it('generates a method declaration with the correct statements', () => {
      expect(getDefaultInternals.statements).toEqual(`return {};`);
    });
  });
});
