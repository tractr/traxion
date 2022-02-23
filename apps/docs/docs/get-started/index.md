---
id: index
title: Get started
sidebar_label: Get started
---

## One single command

Use this command to start a new project with Traxion:

```shell
npx create-traxion-workspace
```

## Step by step project creation

Behind the scenes, this previous command will create a new workspace by running the following commands:

- `create-hapify-workpsace` (cli)
  - `create-nx-workspace` (cli)
  - `hapify-workspace` (schematics)
    - `eslint-config` (schematics)
    - `prettier-config` (schematics)
    - `github-workflow` (schematics)
    - (`nestjs-application`) (schematics)
    - (`angular-application`) (schematics)
    - (`react-admin-application`) (schematics)
    - `hapify-library` (schematics)
    - `prisma-library` (schematics)
