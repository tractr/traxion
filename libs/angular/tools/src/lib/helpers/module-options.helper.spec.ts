/* eslint-disable max-classes-per-file */
import { InjectionToken, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IsString } from 'class-validator';

import { ModuleOptionsFactory } from './module-options.helper';

describe('ModuleOptionsFactory', () => {
  it('should be defined', () => {
    expect(ModuleOptionsFactory).toBeTruthy();
  });

  it('should create an Options provider and use the default', async () => {
    const injectionToken = new InjectionToken<Record<string, unknown>>('TEST');

    @NgModule()
    class Test extends ModuleOptionsFactory(injectionToken, {
      foo: 'bar',
      test: 'foo',
    }) {}

    const moduleFixture = TestBed.configureTestingModule({
      imports: [
        Test.register({
          test: 'test',
        }),
      ],
    });

    const test = moduleFixture.inject(injectionToken);
    expect(test).toBeDefined();
    expect(test.foo).toBe('bar');
    expect(test.test).toBe('test');
  });

  it('should create an Options provider and validate the default', async () => {
    const validate = jest.fn((opt) => opt);
    const injectionToken = new InjectionToken<Record<string, unknown>>('TEST');

    @NgModule()
    class Test extends ModuleOptionsFactory(injectionToken, validate) {}

    let moduleFixture = TestBed.configureTestingModule({
      imports: [
        Test.register({
          test: 'test',
        }),
      ],
    });

    const test = moduleFixture.inject(injectionToken);
    expect(test).toBeDefined();
    expect(test.test).toBe('test');
    expect(validate).toHaveBeenCalled();
    expect(validate).toHaveBeenCalledWith({
      test: 'test',
    });

    try {
      validate.mockImplementationOnce(() => {
        throw new Error('test');
      });
      moduleFixture = TestBed.configureTestingModule({
        imports: [
          Test.forRoot({
            test: true,
          }),
        ],
      });
      expect(false).toBe(true);
    } catch (e) {
      if (!(e instanceof Error))
        throw new Error(`error must be an instance of Error`);

      expect(e.message).toContain('test');
    }
  });

  it('should create an Options provider and get and validate the default', async () => {
    const injectionToken = new InjectionToken<Record<string, unknown>>('TEST');

    class Validate {
      @IsString()
      test!: string;

      @IsString()
      foo = 'bar';
    }

    @NgModule()
    class Test extends ModuleOptionsFactory(injectionToken, Validate) {}

    let moduleFixture = TestBed.configureTestingModule({
      imports: [
        Test.register({
          test: 'test',
        }),
      ],
    });

    const test = moduleFixture.inject(injectionToken);
    expect(test).toBeDefined();
    expect(test.test).toBe('test');
    expect(test.foo).toBe('bar');

    try {
      moduleFixture = TestBed.configureTestingModule({
        imports: [
          Test.forRoot({
            test: true,
          } as unknown as Partial<Validate>),
        ],
      });
    } catch (e) {
      if (!(e instanceof Error))
        throw new Error(`error must be an instance of Error`);

      expect(e.message).toContain(
        'An error occur during the object validation',
      );
    }
  });

  it('should create an Options provider with registerAsync', async () => {
    const injectionToken = new InjectionToken<Record<string, unknown>>('TEST');

    class Validate {
      @IsString()
      test!: string;

      @IsString()
      foo = 'bar';
    }

    @NgModule()
    class Test extends ModuleOptionsFactory(injectionToken, Validate) {}

    let moduleFixture = TestBed.configureTestingModule({
      imports: [
        Test.registerAsync({
          useFactory: (defaultOptions) => {
            expect(defaultOptions).toEqual({ foo: 'bar' });

            return { ...defaultOptions, test: 'test' };
          },
        }),
      ],
    });

    const test = moduleFixture.inject(injectionToken);
    expect(test).toBeDefined();
    expect(test.test).toBe('test');
    expect(test.foo).toBe('bar');

    moduleFixture.resetTestingModule();

    try {
      moduleFixture = TestBed.configureTestingModule({
        imports: [
          Test.registerAsync({
            useFactory: (defaultOptions) => {
              expect(defaultOptions).toEqual({ foo: 'bar' });

              return {
                ...defaultOptions,
                test: true,
              } as unknown as Partial<Validate>;
            },
          }),
        ],
      });
    } catch (e) {
      if (!(e instanceof Error))
        throw new Error(`error must be an instance of Error`);

      expect(e.message).toContain(
        'An error occur during the object validation',
      );
    }
  });
});
