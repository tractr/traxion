# Hapify - Templates for models classes and types

## Installation

```sh
npm install @tractr/hapify-templates-models --save-dev
```

## Usage

In your `package.json`:

```javascript
{
  "name": "my-library",
  "version": "0.0.1",
  "hapify": { "extends": ["@tractr/hapify-templates-models"] }
}
```

If you would like to extend or modify these properties, create a `.hapifyrc.js`
file in your projects root directory and export your desired modifications.

```javascript
module.exports = {
  extends: ['hapify-templates-models'],
};
```

Or you can create a `.hapifyrc.json` file in your projects root directory.

```javascript
{ "extends": [ '@tractr/hapify-templates-models' ] }
```
