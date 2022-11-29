# Traxion

The traxion stack is base on [hapify](https://docs.hapify.io/) and is intent to
remove a lot of burden during the first stage of an application. By using the
capabilities of hapify and declaring a datamodel, traxion will be able to
generate for you all you need to start using an API, an authentication, an
authorization system in an [nestJs](https://docs.nestjs.com/) and [angular](https://angular.io/docs) environment.

## How to start using traxion

TODO write this part when the schematics will be ready

## How to migrate

You can check our [migrations guide](https://github.com/tractr/stack/blob/main/MIGRATIONS.md) to update the different version.

## Known issues

### Semver

Since Traxion is using jscutlery semver package with the sync version it got some bug when using nx.

The issues are reported here:
    [#420](https://github.com/jscutlery/semver/issues/420)
    [#547](https://github.com/jscutlery/semver/issues/547)

For now nx will complain when using some commands. To be able to run them you will need for now to remove the `"workspace": ""` line, run your command and add the line back again.
