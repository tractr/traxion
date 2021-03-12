# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# @tractr/nestjs-core [1.1.0](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.0.2...@tractr/nestjs-core@1.1.0) (2021-03-12)


### Features

* add test to hapify templates models ([#3](https://github.com/tractr/stack/issues/3)) ([94cfa21](https://github.com/tractr/stack/commit/94cfa21e3b19770da715d48f86ec37462cb01d49))

## @tractr/nestjs-core [1.0.2](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.0.1...@tractr/nestjs-core@1.0.2) (2021-03-08)


### Bug Fixes

* change prepare scripts to prepublishOnly and not build when installing packages ([17366ad](https://github.com/tractr/stack/commit/17366ada324f19b5a853a96a01f42996a43385b8))

## @tractr/nestjs-core [1.0.1](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.0.0...@tractr/nestjs-core@1.0.1) (2021-03-04)


### Bug Fixes

* replace postinstall script to prepare to build packages/ only on local ([5d96852](https://github.com/tractr/stack/commit/5d96852f2e753c78c62248c3f9846e6e0e94c07c))

# @tractr/nestjs-core 1.0.0 (2021-03-04)


### Bug Fixes

* add the rights files into packages to publish to npm registry ([760c1f9](https://github.com/tractr/stack/commit/760c1f98da944f39f821c7d4e30847e229bba44d))
* enfore repository settings to match with tractr/stack and allow npm publish ([0bd1ea3](https://github.com/tractr/stack/commit/0bd1ea38f5c1fc5f88e5611b214de8418bd59bdc))
* overrides the controllers in the end instead of on the flow ([79acae7](https://github.com/tractr/stack/commit/79acae79cfd8dff632ba686d15eb8c4e5c62669d))
* **nestjs-user:** use named DI to be able to override inside the modules ([cf9a9ab](https://github.com/tractr/stack/commit/cf9a9abb9e101b9e83107b613d628639f15e9ed0))
* add prisma generation into version control and start to configure nestjs-user to export files ([b621526](https://github.com/tractr/stack/commit/b621526e2a9c7dc5ed5f0a88c8cabffb636c17f7))


### Features

* **nestjs-core:** add clean interface to nest-js module override class ([d1dd979](https://github.com/tractr/stack/commit/d1dd9796d4c8b516b091c551cb3eca8d0f1aaabc))
* **nestjs-testing:** add nestjs testing tools to use a different prisma database for each test ([a33102a](https://github.com/tractr/stack/commit/a33102a5fc29fd904aad49e6663ea4d336124a1e))
* add module register helper and clean authentication module ([f6d9179](https://github.com/tractr/stack/commit/f6d91799445acf434a86b88f5667070d86333bab))
