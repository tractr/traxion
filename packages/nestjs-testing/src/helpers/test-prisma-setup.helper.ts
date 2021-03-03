import { execSync } from 'child_process';

import { DynamicModule, INestApplication, Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { nanoid } from 'nanoid';
import { Client } from 'pg';

export interface TestContext {
  app: INestApplication;
}

export interface TestContextOptions {
  databaseUrlEnv: string;
}

export function createUrlDatabase(schema: string): string {
  const env = dotenvExpand(dotenv.config());
  const {
    POSTGRESQL_PORT,
    POSTGRESQL_USER,
    POSTGRESQL_PASSWORD,
    POSTGRESQL_HOST,
    POSTGRESQL_DB_TEST,
  } = env.parsed as Record<string, string>;
  return `postgres://${POSTGRESQL_USER}:${POSTGRESQL_PASSWORD}@${POSTGRESQL_HOST}:${POSTGRESQL_PORT}/${
    POSTGRESQL_DB_TEST || 'testing'
  }?schema=${schema}`;
}

export function createTestContext(
  AppModule: Type | DynamicModule,
  options: TestContextOptions = { databaseUrlEnv: 'TRACTR_DATABASE_URL' },
): TestContext {
  const ctx = {} as TestContext;

  let app: INestApplication;
  let schema: string;
  let databaseUrl: string;

  beforeEach(async () => {
    // Generate a unique schema identifier for this test context
    const random = nanoid();
    schema = `test_${random}`;

    // Generate the pg connection string for the test schema
    databaseUrl = createUrlDatabase(schema);

    // Set the required environment variable to contain the connection string
    // to our database test schema
    process.env[options.databaseUrlEnv] = databaseUrl;

    // Run the migrations to ensure our schema has the required structure
    execSync(`npx prisma db push --preview-feature`, {
      env: {
        ...process.env,
        [options.databaseUrlEnv]: databaseUrl,
      },
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    Object.assign(ctx, {
      app,
    });
  });

  afterEach(async () => {
    // Drop the schema after the tests have completed
    const client = new Client({
      connectionString: databaseUrl,
    });
    try {
      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      await client.end();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    await app?.close();
  });

  return ctx;
}
