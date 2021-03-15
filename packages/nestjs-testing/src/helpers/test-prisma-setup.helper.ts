import { execSync } from 'child_process';

import { DynamicModule, INestApplication, Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { nanoid } from 'nanoid';
import { Client } from 'pg';

export interface TestContext {
  app: INestApplication;
  prisma?: PrismaClient;
}

export interface TestContextOptions {
  databaseUrlEnv: string;
  prisma: boolean;
  migrate: boolean;
  seed: boolean;
}

export function createUrlDatabase(schema: string): string {
  const env = dotenvExpand(dotenv.config());
  const {
    TRACTR_POSTGRESQL_PORT,
    TRACTR_POSTGRESQL_USER,
    TRACTR_POSTGRESQL_PASSWORD,
    TRACTR_POSTGRESQL_HOST,
    TRACTR_POSTGRESQL_DB_TEST,
  } = env.parsed as Record<string, string>;
  return `postgres://${TRACTR_POSTGRESQL_USER}:${TRACTR_POSTGRESQL_PASSWORD}@${TRACTR_POSTGRESQL_HOST}:${TRACTR_POSTGRESQL_PORT}/${
    TRACTR_POSTGRESQL_DB_TEST || 'testing'
  }?schema=${schema}`;
}

export function createTestContext(
  AppModule: Type | DynamicModule,
  testContextOptions: Partial<TestContextOptions> = {},
): TestContext {
  const options: TestContextOptions = {
    databaseUrlEnv: 'TRACTR_DATABASE_URL',
    prisma: true,
    migrate: true,
    seed: true,
    ...testContextOptions,
  };

  const ctx = {} as TestContext;

  let app: INestApplication;
  let prisma: PrismaClient;
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
    if (options.migrate) {
      execSync(`npx prisma db push --preview-feature`, {
        env: {
          ...process.env,
          [options.databaseUrlEnv]: databaseUrl,
        },
      });
    }

    // Seed the database
    if (options.seed) {
      execSync(`npx prisma db seed --preview-feature`, {
        env: {
          ...process.env,
          [options.databaseUrlEnv]: databaseUrl,
        },
      });
    }

    if (options.prisma) {
      prisma = new PrismaClient();
      await prisma.$connect();
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    Object.assign(ctx, {
      app,
      prisma,
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
      if (options.prisma) {
        await prisma.$disconnect();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    await app?.close();
  });

  return ctx;
}
