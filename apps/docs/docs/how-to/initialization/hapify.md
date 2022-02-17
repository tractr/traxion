---
id: hapify
title: New project - Hapify
sidebar_label: Hapify
---

## Add Hapify to the project

Run the following command to install the Hapify packages:

```shell
npm i -D @hapify/cli @tractr/hapify-config @tractr/hapify-generate-config
```

:::note

Hapify is a template engine for CRUD operations.
It is used to generate every part of the applications related to the data-models.

:::

### Ignore generated paths

Add these lines to the `.gitignore` file:

```ignore
# Hapify
**/hapify.json
**/prisma/schemas/generated.prisma.hpf
**/hapify/
```
