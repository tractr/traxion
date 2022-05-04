# Stack

The traxion stack is base on [hapify](https://docs.hapify.io/) and is intent to
remove a lot of burden during the first stage of an application. By using the
capabilities of hapify and declaring a datamodel, traxion will be able to
generate for you all you need to start using an API, an authentication, an
authorization system in an [nestJs](https://docs.nestjs.com/) and [angular](https://angular.io/docs) environment.

## How to start using traxion

TODO write this part when the schematics will be ready

## How to migrate

You can check our [migrations guide](https://github.com/tractr/stack/blob/main/MIGRATIONS.md) to update the different version.

## Schematics

### How to use schematics within this repository

First, build schematics

```
nx build schematics
```

Run the schematic from the dist folder

```
nx g ./dist/libs/schematics:admin-app
```
