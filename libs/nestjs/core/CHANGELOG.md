# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [1.6.1](https://github.com/tractr/stack/compare/nestjs-core-1.6.0...nestjs-core-1.6.1) (2021-06-29)


### Bug Fixes

* add transform string to int decorator to query, body and params ([#150](https://github.com/tractr/stack/issues/150)) ([ee3fcd6](https://github.com/tractr/stack/commit/ee3fcd68aff87db2c09e77dc7e930f36dcab0a8b))



# [1.6.0](https://github.com/tractr/stack/compare/nestjs-core-1.5.0...nestjs-core-1.6.0) (2021-06-16)

### Features

- change stack lerna repository to nx workspace
  ([#119](https://github.com/tractr/stack/issues/119))
  ([e9104bd](https://github.com/tractr/stack/commit/e9104bde081619c0f3752bb9d129e19d1d6bda5d))

# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# @tractr/nestjs-core [1.5.0](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.4.1...@tractr/nestjs-core@1.5.0) (2021-04-12)

### Features

- update README of packages to publish new versions
  ([#77](https://github.com/tractr/stack/issues/77))
  ([e6bf415](https://github.com/tractr/stack/commit/e6bf415af3fe5588c15577f047a6262f81c1564f))

## @tractr/nestjs-core [1.4.1](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.4.0...@tractr/nestjs-core@1.4.1) (2021-04-05)

### Bug Fixes

- make the register option param optional if no specfic options is needed
  ([#52](https://github.com/tractr/stack/issues/52))
  ([2681a63](https://github.com/tractr/stack/commit/2681a63b5439eff83e730554f727c8507cf381da))

# @tractr/nestjs-core [1.4.0](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.3.1...@tractr/nestjs-core@1.4.0) (2021-04-02)

### Features

- add LoggerModule and deprecate the CoreModule
  ([#49](https://github.com/tractr/stack/issues/49))
  ([5c6d639](https://github.com/tractr/stack/commit/5c6d639b6d35c191203ea1981e6a7db296d14d5c))

## @tractr/nestjs-core [1.3.1](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.3.0...@tractr/nestjs-core@1.3.1) (2021-04-02)

### Bug Fixes

- enforce default configuration to be strict typed
  ([#50](https://github.com/tractr/stack/issues/50))
  ([8f0be1e](https://github.com/tractr/stack/commit/8f0be1e057915dc26a20f759635ba9ed03587f83))

# @tractr/nestjs-core [1.3.0](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.2.2...@tractr/nestjs-core@1.3.0) (2021-03-29)

### Features

- add a validateEnv helper to the nestjs-core packages
  ([#47](https://github.com/tractr/stack/issues/47))
  ([34f2595](https://github.com/tractr/stack/commit/34f2595995f386219804f86d9799031a14b3e07e))

## @tractr/nestjs-core [1.2.2](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.2.1...@tractr/nestjs-core@1.2.2) (2021-03-29)

### Bug Fixes

- make the useFactory interface accept undefined type
  ([#46](https://github.com/tractr/stack/issues/46))
  ([ddc8103](https://github.com/tractr/stack/commit/ddc8103415b2f54d63e3f0dfa32d89ab1561b56d))

## @tractr/nestjs-core [1.2.1](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.2.0...@tractr/nestjs-core@1.2.1) (2021-03-23)

### Bug Fixes

- update module-options helper types to be less strict
  ([#39](https://github.com/tractr/stack/issues/39))
  ([4067eb2](https://github.com/tractr/stack/commit/4067eb2235ef8de6c25b8afd9c9aa691535f1f99))

# @tractr/nestjs-core [1.2.0](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.1.0...@tractr/nestjs-core@1.2.0) (2021-03-22)

### Features

- update moduleOptionsHelper ([#38](https://github.com/tractr/stack/issues/38))
  ([32fcca5](https://github.com/tractr/stack/commit/32fcca58a73a18d7db194fcf094a512eeeb75719))

# @tractr/nestjs-core [1.1.0](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.0.2...@tractr/nestjs-core@1.1.0) (2021-03-12)

### Features

- add test to hapify templates models
  ([#3](https://github.com/tractr/stack/issues/3))
  ([94cfa21](https://github.com/tractr/stack/commit/94cfa21e3b19770da715d48f86ec37462cb01d49))

## @tractr/nestjs-core [1.0.2](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.0.1...@tractr/nestjs-core@1.0.2) (2021-03-08)

### Bug Fixes

- change prepare scripts to prepublishOnly and not build when installing
  packages
  ([17366ad](https://github.com/tractr/stack/commit/17366ada324f19b5a853a96a01f42996a43385b8))

## @tractr/nestjs-core [1.0.1](https://github.com/tractr/stack/compare/@tractr/nestjs-core@1.0.0...@tractr/nestjs-core@1.0.1) (2021-03-04)

### Bug Fixes

- replace postinstall script to prepare to build packages/ only on local
  ([5d96852](https://github.com/tractr/stack/commit/5d96852f2e753c78c62248c3f9846e6e0e94c07c))

# @tractr/nestjs-core 1.0.0 (2021-03-04)

### Bug Fixes

- add the rights files into packages to publish to npm registry
  ([760c1f9](https://github.com/tractr/stack/commit/760c1f98da944f39f821c7d4e30847e229bba44d))
- enfore repository settings to match with tractr/stack and allow npm publish
  ([0bd1ea3](https://github.com/tractr/stack/commit/0bd1ea38f5c1fc5f88e5611b214de8418bd59bdc))
- overrides the controllers in the end instead of on the flow
  ([79acae7](https://github.com/tractr/stack/commit/79acae79cfd8dff632ba686d15eb8c4e5c62669d))
- **nestjs-user:** use named DI to be able to override inside the modules
  ([cf9a9ab](https://github.com/tractr/stack/commit/cf9a9abb9e101b9e83107b613d628639f15e9ed0))
- add prisma generation into version control and start to configure nestjs-user
  to export files
  ([b621526](https://github.com/tractr/stack/commit/b621526e2a9c7dc5ed5f0a88c8cabffb636c17f7))

### Features

- **nestjs-core:** add clean interface to nest-js module override class
  ([d1dd979](https://github.com/tractr/stack/commit/d1dd9796d4c8b516b091c551cb3eca8d0f1aaabc))
- **nestjs-testing:** add nestjs testing tools to use a different prisma
  database for each test
  ([a33102a](https://github.com/tractr/stack/commit/a33102a5fc29fd904aad49e6663ea4d336124a1e))
- add module register helper and clean authentication module
  ([f6d9179](https://github.com/tractr/stack/commit/f6d91799445acf434a86b88f5667070d86333bab))
