# Hapify - Prisma Boilerplate

This package contains the hapify templates to generate Prisma database schema.

## Installation

```sh
npm install @tractr/hapify-templates-prisma --save-dev
```

## Usage

In your `package.json`:

```javascript
{
  "name": "my-library",
  "version": "1.0.0",
  "hapify": { "extends": ["@tractr/hapify-templates-prisma"] }
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
{ "extends": [ '@tractr/hapify-templates-prisma' ] }
```
