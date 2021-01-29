<div align="center">
<h1>@tractr/hapify-boilerplate-prisma</h1>
</div>

## Installation

```sh
npm install @tractr/hapify-boilerplate-prisma --save-dev
```

## Usage

In your `package.json`:

```javascript
{
  "name": "my-library",
  "version": "1.0.0",
  "hapify": { "extends": ["@tractr/hapify-boilerplate-prisma"] }
}
```

If you would like to extend or modify these properties, create a `.hapifyrc.js`
file in your projects root directory and export your desired modifications.

```javascript
module.exports = {
  extends: ['hapify-boilerplate-prisma'],
};
```

Or you can create a `.hapifyrc.json` file in your projects root directory.

```javascript
{ "extends": [ '@tractr/hapify-boilerplate-prisma' ] }
```
