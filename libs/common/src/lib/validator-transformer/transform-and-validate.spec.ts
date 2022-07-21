import { IsString, validate } from 'class-validator';
import { TestScheduler } from 'rxjs/testing';

import {
  defaultsPropertiesMap,
  formatTransformAndValidateErrorMessage,
  fromDto,
  getDefaults,
  isAlike,
  transformAndValidate,
  transformAndValidateMap,
} from './transform-and-validate';

describe('transformAndValidate', () => {
  class TestClass {
    @IsString()
    foo!: string;

    bar = 'test';
  }
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should return the default values', () => {
    let defaults = getDefaults(TestClass);

    expect(defaults).toEqual({
      bar: 'test',
    });

    defaults = getDefaults(TestClass, { plainToClass: {} });

    expect(defaults).toEqual({
      bar: 'test',
    });
  });

  it('should format the transformAndValidateErrorMessage', async () => {
    const error = new TestClass();
    error.foo = [] as any;

    const validationErrors = await validate(error);

    let message = formatTransformAndValidateErrorMessage(validationErrors);

    expect(message).toBeInstanceOf(Error);
    expect(message.message).toBe(`An error occur during the object validation:

  Property foo (value: ): 
  - foo must be a string

`);
    message = formatTransformAndValidateErrorMessage(
      validationErrors.map(({ property, value }) => ({ property, value })),
    );

    expect(message).toBeInstanceOf(Error);
    expect(message.message).toBe(`An error occur during the object validation:

  Property foo (value: ) has an error without constraint`);

    expect(() => formatTransformAndValidateErrorMessage([])).toThrow(
      'No error to format',
    );
  });

  it('should transform and validate form a class validator an object and return an instance', async () => {
    const instance = new TestClass();
    instance.foo = 'test';

    const testClassValidate = transformAndValidate(TestClass);

    const transformedInstance = testClassValidate(instance);

    expect(transformedInstance).toBeInstanceOf(TestClass);
    expect(transformedInstance.foo).toBe('test');
    expect(transformedInstance.bar).toBe('test');

    instance.foo = [] as any;
    expect(() => testClassValidate(instance)).toThrow();
  });

  it('should check if an object is like a class', () => {
    expect(isAlike(new TestClass(), TestClass)).toBe(true);
    expect(isAlike({ foo: 'test' }, TestClass)).toBe(true);
    expect(isAlike({ foo: [] }, TestClass)).toBe(false);
    expect(isAlike({ foo: 'test', bar: 'test' }, TestClass)).toBe(true);
    expect(isAlike({ foo: 'test', bar: [] }, TestClass)).toBe(true);
  });

  it('should get defaults during a pipe', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const source$ = cold('-a-|', {
        a: { foo: 'test' },
      });
      const final$ = source$.pipe(defaultsPropertiesMap(TestClass));
      const expected = '-b-|';

      expectObservable(final$).toBe(expected, {
        b: { foo: 'test', bar: 'test' },
      });
    });
  });

  it('should get defaults during a pipe even if no value is provided', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const source$ = cold('-a-|', {
        a: undefined,
      });
      const final$ = source$.pipe(defaultsPropertiesMap(TestClass));
      const expected = '-b-|';

      expectObservable(final$).toBe(expected, {
        b: { bar: 'test' },
      });
    });
  });

  it('should transform and validate during a pipe', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const source$ = cold('-a-|', {
        a: { foo: 'test' },
      });
      const final$ = source$.pipe(transformAndValidateMap(TestClass));
      const expected = '-b-|';

      const instance = new TestClass();
      instance.foo = 'test';
      instance.bar = 'test';

      expectObservable(final$).toBe(expected, {
        b: instance,
      });
    });
  });

  it('should be able to use an observable from dto', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;

      const source$ = fromDto({ foo: 'bar' }, TestClass);
      const expected = '(b|)';

      const instance = new TestClass();
      instance.foo = 'bar';
      instance.bar = 'test';

      expectObservable(source$).toBe(expected, {
        b: instance,
      });
    });
  });

  it('should be able to use an observable from dto', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;

      const source$ = fromDto({ foo: 'bar' }, TestClass, {
        plainToClass: {},
      });
      const expected = '(b|)';

      const instance = new TestClass();
      instance.foo = 'bar';
      instance.bar = 'test';

      expectObservable(source$).toBe(expected, {
        b: instance,
      });
    });
  });
});
