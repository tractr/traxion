---
id: prisma-configuration
title: Prisma Configuration
sidebar_label: Prisma Configuration
---
Traxion generators offer customization through the parameterization of Prisma. This utilizes what we call metadata directly within the Prisma schema.

## Metadata

A Traxion metadata is a Prisma comment that begins with three `/`. Traxion employs a convention of namespacing these metadata to avoid interference with other generators using the same system. Thus, you can add as many metadata before a model or field.

All metadata beginning with `/// @trxn/` will be interpreted by Traxion. Anything else is considered as documentation.

## User Singularity

In every application, one table always stands out as a singularity, typically the User table. Traxion is no exception and must identify the model carrying the user information within it.

To use Traxion without special configuration, at least the following minimal user model should be respected:

```prisma
model User {
  id       String    @id @default(uuid())
  email    String @unique
  role     String @default("user")
  /// @trxn/hidden
  /// @trxn/encrypted
  password String
}
```

We'll elaborate on the different metadata used here below.

Note: The `id` field here is a string but can also be an Int: `id Int @id @default(autoincrement())`.

Note: The `role` field here is a string but can also be an array of strings `roles String[] @default(["user"])`.

## User Discovery

Traxion tries to identify without any configuration which model in your database schema carries your user information.

For this, Traxion first checks if any of your models have the `user` metadata. If yes, this model will be used as the root model to explore your schema's ownership tree. If not, Traxion will try to find a model named `user` or `users` (case does not matter). If nothing is found, certain generators will emit an error (casl).

```prisma
/// @trxn/user
model UserTable {
  //...
}

model User {
  // ...
}
```

Here, Traxion will use the `UserTable` as the root user table.

```prisma
model UserTable {
  //...
}

model User {
  // ...
}
```

Here, Traxion will automatically use the `User` table as the root user table.

## Ownership

Traxion tries to automatically discover your data model's dependency tree, starting with the user model. The tree will traverse the model relations. From this, direct and indirect owned models can be detected.

An owned model is a model related to the user table. In Traxion, if an entity is owned by a user, the user can read, create, and update it. Otherwise, the user can only read it.

Note: You always have the option to use or not to use the generated casl configuration, to use it in whole or in part at your convenience. Traxion will provide you with helpers and try to propose a range of automatic casl configurations. If you are not satisfied, you can opt out of some functionalities and configure as you wish.

You can directly tweak some configurations of the casl config with metadata on your models:

- `@trxn/ownership:ignore` Ignore the model and all its relations for ownership detection

## Read, Write, Delete Authorization

The ownership tree is used to define the casl ids to fetch for each user and which configuration should be used by default when reading or writing on an owned or unowned model.

In your schema, you can add permission configuration to instruct Traxion how it must handle each model with the casl configuration:

- `@trxn/permission:allowDelete` the user

 can read, write, and delete the model

- `@trxn/permission:write` the user can read and write the model
- `@trxn/permission:readonly` the user can only read the model
- `@trxn/permission:internal` the user cannot read and write the model

## Hidden and Encrypted Fields

The hidden metadata on a field allows you to hide this data from the output interface. The input will still request for the field if it is required. This filtering is done in the business layer.

```prisma
model User {
  // ...

  /// @trxn/hidden
  password String

  // ...
}
```

The encrypted metadata on a field allows you to encrypt the field (with bcrypt by default) during the update or creation of the business layer.

```prisma
model User {
  // ...

  /// @trxn/encrypted
  password String

  // ...
}
```
