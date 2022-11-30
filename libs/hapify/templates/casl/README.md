# Hapify - Templates for casl classes and types

This package contains the hapify templates to generate model classes and enums.

## Installation

```sh
npm install @trxn/hapify-templates-casl --save-dev
```

## Usage

In your `package.json`:

```javascript
{
  "name": "my-library",
  "version": "0.0.1",
  "hapify": { "extends": ["@trxn/hapify-templates-casl"] }
}
```

If you would like to extend or modify these properties, create a `.hapifyrc.js`
file in your projects root directory and export your desired modifications.

```javascript
module.exports = {
  extends: ['hapify-templates-casl'],
};
```

Or you can create a `.hapifyrc.json` file in your projects root directory.

```javascript
{ "extends": [ '@trxn/hapify-templates-casl' ] }
```
