# Hapify - DBML Schema

This package generate a DBML Schema from the hapify modelisation. It can be used
to visualize the database schema in `https://dbdiagram.io`.

## Installation

```sh
npm install @tractr/hapify-templates-dbml --save-dev
```

## Usage

In your `package.json`:

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "hapify": { "extends": ["@tractr/hapify-templates-dbml"] }
}
```

If you would like to extend or modify these properties, create a `.hapifyrc.js`
file in your projects root directory and export your desired modifications.

```javascript
module.exports = {
  extends: ['hapify-templates-dbml'],
};
```

Or you can create a `.hapifyrc.json` file in your projects root directory.

```json
{ "extends": ["@tractr/hapify-templates-dbml"] }
```
