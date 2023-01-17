---
id: configuration
title: Configuration
sidebar_label: Configuration
---

:::caution Coming soon

This page is under construction.

Join our [Discord](https://discord.traxion.dev/) server to get notified when it's ready.

:::

## Install

`npm i --save-dev @trxn/hapify-templates-prisma`

## Description

This package contains the hapify templates to generate Prisma database schema.

### Usage

In your `package.json`:

```javascript
{
  "name": "my-library",
  "version": "1.0.0",
  "hapify": { "extends": ["@trxn/hapify-templates-prisma"] }
}
```

If you would like to extend or modify these properties, create a `.hapifyrc.js`
file in your projects root directory and export your desired modifications.

```javascript
module.exports = {
  extends: ['hapify-templates-prisma'],
};
```

Or you can create a `.hapifyrc.json` file in your projects root directory.

```javascript
{ "extends": [ '@trxn/hapify-templates-prisma' ] }
```
