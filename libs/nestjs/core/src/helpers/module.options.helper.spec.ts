/* eslint-disable max-classes-per-file */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IsString } from 'class-validator';

import { ModuleOptionsFactory } from './module-options.helper';

describe('ModuleOptionsFactory', () => {
  let app: INestApplication;

  it('should be defined', () => {
    expect(ModuleOptionsFactory).toBeTruthy();
  });

  afterEach(async () => {
    if (app) await app.close();
  });

  it('should create an Options provider and use the default', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ModuleOptionsFactory('TEST', { foo: 'bar', test: 'foo' }).register({
          test: 'test',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    const test = app.get('TEST');
    expect(test).toBeDefined();
    expect(test.foo).toBe('bar');
    expect(test.test).toBe('test');
  });

  it('should create an Options provider and validate the default', async () => {
    const validate = jest.fn((opt) => opt);
    let moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ModuleOptionsFactory('TEST', validate).register({
          test: 'test',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    const test = app.get('TEST');
    expect(test).toBeDefined();
    expect(validate).toHaveBeenCalled();
    expect(validate).toHaveBeenCalledWith({
      test: 'test',
    });
    expect(test.test).toBe('test');

    await app.close();

    try {
      validate.mockImplementationOnce(() => {
        throw new Error('test');
      });
      moduleFixture = await Test.createTestingModule({
        imports: [
          ModuleOptionsFactory('TEST', validate).forRoot({
            test: true,
          }),
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
    } catch (e) {
      if (!(e instanceof Error))
        throw new Error(`error must be an instance of Error`);

      expect(e.message).toContain('test');
    }
  });

  it('should create an Options provider and get and validate the default', async () => {
    class Validate {
      @IsString()
      test!: string;

      @IsString()
      foo = 'bar';
    }

    let moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ModuleOptionsFactory('TEST', Validate).register({
          test: 'test',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    const test = app.get('TEST');
    expect(test).toBeDefined();
    expect(test.test).toBe('test');
    expect(test.foo).toBe('bar');

    await app.close();

    try {
      moduleFixture = await Test.createTestingModule({
        imports: [
          ModuleOptionsFactory('TEST', Validate).forRoot({
            test: true,
          } as unknown as Partial<Validate>),
        ],
      }).compile();
    } catch (e) {
      if (!(e instanceof Error))
        throw new Error(`error must be an instance of Error`);

      expect(e.message).toContain(
        'An error occur during the object validation',
      );
    }
  });

  it('should create an Options provider with registerAsync', async () => {
    class Validate {
      @IsString()
      test!: string;

      @IsString()
      foo = 'bar';
    }

    let moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ModuleOptionsFactory('TEST', Validate).registerAsync({
          useFactory: (defaultOptions) => {
            expect(defaultOptions).toEqual({ foo: 'bar' });

            return { ...defaultOptions, test: 'test' };
          },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    const test = app.get('TEST');
    expect(test).toBeDefined();
    expect(test.test).toBe('test');
    expect(test.foo).toBe('bar');

    await app.close();

    try {
      moduleFixture = await Test.createTestingModule({
        imports: [
          ModuleOptionsFactory('TEST', Validate).forRootAsync({
            useFactory: (defaultOptions) => {
              expect(defaultOptions).toEqual({ foo: 'bar' });

              return {
                ...defaultOptions,
                test: true,
              } as unknown as Partial<Validate>;
            },
          }),
        ],
      }).compile();
    } catch (e) {
      if (!(e instanceof Error))
        throw new Error(`error must be an instance of Error`);

      expect(e.message).toContain(
        'An error occur during the object validation',
      );
    }
  });
});
