---
id: database-migration-with-prisma
title: Database migration with Prisma
sidebar_label: Database migration
---

## What is Prisma ?

Prisma is a TypeScript ORM that relies on code generation to create a strongly typed database client that matches your database schema.

In order to generate the database client, Prisma uses a schema describing your database models and their relationships.

Prisma also comes with a migration tool called `prisma migrate` which is capable of generating database migration scripts, allowing you to move from one version of your database schema, to another.

As stated in the `prisma migrate` [documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate):

> Prisma Migrate is an **imperative database schema migration tool** that enables you to:
>
> - Keep your database schema in sync with your [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) as it evolves *and*
> - Maintain existing data in your database

:::caution

This document is intended to provide an overview of the workflow for using migrations from development to production. However, you should also consult the [Prisma documentation](https://www.prisma.io/docs) as this document is not exhaustive!

:::

## When to use Prisma migrations

Migrations are a great tool, but you don't need them in the early stages of your project. Prisma also has a command called `prisma db push` which, while serving a similar purpose (updating the database schema), is different from `prisma migrate`.

The `prisma db push` command pushes a Prisma schema onto the target database. This is useful for prototyping, but it doesn't guarantee the security of your data and doesn't keep a history of schema changes like migration does.

So if your application contains data in a production environment that should not be lost when the schema is updated, you should use migrations. Otherwise, you can continue working without migrations.

## Migrations state

Prisma Migrate uses the following state elements to track the status of your database schema:

- **Prisma schema**: Your source of truth that defines the structure of the database schema.
- **Migrations history**: SQL files in your `prisma/migrations` folder representing the history of changes made to your database schema.
- **Migrations table**: `prisma_migrations` table in the database that stores the metadata of migrations that have been applied to the database.
- **Database schema**: The state of the database.

Note that the migration history must be tracked by your versioning system!

## Environments

:::caution

The Prisma migrate tool uses variables from your environment to connect to the database. You should always be careful when performing migrations, as you could mistakenly make unwanted changes to a production environment.

:::

## Migrations during development

`prisma migrate` has a dedicated command for development environments called `prisma migrate dev`. This command should only be used in development environments to create and apply migrations. It relies on a shadow database to detect schema drift.

When running `prisma migrate dev`, the command

1. Reruns the existing migration history in the shadow database to detect schema drift (edited or deleted migration file, or manually modified database schema).
2. Applies current migrations to the shadow database (for example, new migrations created by colleagues).
3. Generates a new migration from any changes you made to the Prisma schema before running `migrate dev`.
4. Applies all unapplied migrations to the development database and updates the `_prisma_migrations` table.
5. Triggers the generation of artifacts (e.g., the Prisma client).

### Initialize migration history

When the project reaches a stable schema, and it is no longer possible to flush data during schema changes (usually when there is a staging and/or production environment), it is time to start using migrations.

To do so, you need to dump your current database (you can delete the docker volume with `docker volume rm <the_name_of_the_volume>`).

Then you can run `prisma migrate dev --create-only` to generate the initial migration script. Once you have verified that everything is correct in the generated script, you can apply the migration with `prisma migrate dev` and add it to your git history.

### Resetting a development database

The `prisma migrate reset` command can be useful when working in development. It can be used to completely reset a database by dropping it, running the migration history, and running the startup script if it is available.

### Adding new migrations when updating the Prisma schema

Now imagine the following scenario: the project already has a migration history, and you are working on a new feature that requires updating the database schema.

While prototyping the database schema, you can use `prisma db push` to apply the schema to the database without creating a migration.

When you want to commit the schema changes, you must create the associated database migration. To do this, make sure your database is up to date with the existing migrations (you can for example run `prisma migrate reset`).

Now your database is up to date with the migrations, and the schema is ahead of it, with the functionality changes. You can now run `prisma migrate dev --create-only`, which will create a migration from the state of the last migration to the state of your current Prisma scheme.

You should always review the generated migrations as there are some cases that cannot be covered automatically. Usually, when you add tables and columns, the generation is correct, but when you modify existing structures, you will have to edit the migration to make sure there is no data loss or corruption.

Example: If you rename a column, Prisma will, by default, drop the column and create a new one. More often than not, you'll want to modify the migration to use a `RENAME` clause to avoid data loss.

Once the migration suits your needs, you can apply it to your local database with `prisma migrate dev` and validate it with the new Prisma schema.

:::caution

You must test your migration carefully during development! Once your functionality is merged, the migration is usually deployed automatically by the CI!

:::

### Migrations and collaboration

Migrations allow multiple developers to introduce changes to the Prisma schema at the same time. When you pull a branch that contains new migrations, simply apply them with `prisma migrate dev`, or reset your database with `prisma migrate reset`. Then you are free to make your own changes and generate the associated migrations.

## Migrations in production

Migrations are created during the development stage of a feature, but once the feature is deployed in a production environment, they must be applied to the associated database.

Prisma provides us with the `prisma migrate deploy` command which:

1. Compares applied migrations with the migration history and **warns** if any migrations have been changed:

    ```
    WARNING The following migrations have been modified since they were applied:
    20210313140442_favorite_colors
    ```

2. Apply pending migrations

The `migrate deploy` command:

- **Does not** issue a warning if an already applied migration is *missing* in the migration history.
- **Does not** detect drift (the schema of the production database differs from the final state of the migration history - for example, due to a patch).
- **Does not** reset the database or generate artifacts (like Prisma Client).
- **Does not** rely on a shadow database.

Usually, migrations should be applied during the CI process before deploying the associated code. However, if this is not the case, or if for some other reason you need to apply them manually, you can run the `prisma migrate deploy` command while connected to the target database.

Also, the migration deployment may fail. The `migrate` command has some tools for resolving migration failures, but that topic is outside the scope of this document. You should refer to the official documentation in case of migration failure ([https://www.prisma.io/docs/guides/database/production-troubleshooting](https://www.prisma.io/docs/guides/database/production-troubleshooting)).
