# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [1.22.1](https://github.com/tractr/stack/compare/v1.22.0...v1.22.1) (2021-10-27)



# [1.22.0](https://github.com/tractr/stack/compare/v1.21.4...v1.22.0) (2021-10-19)



## [1.21.4](https://github.com/tractr/stack/compare/v1.21.3...v1.21.4) (2021-10-15)



## [1.21.3](https://github.com/tractr/stack/compare/v1.21.2...v1.21.3) (2021-10-15)



## [1.21.2](https://github.com/tractr/stack/compare/v1.21.1...v1.21.2) (2021-10-15)



## [1.21.1](https://github.com/tractr/stack/compare/v1.21.0...v1.21.1) (2021-10-13)



# [1.21.0](https://github.com/tractr/stack/compare/v1.20.1...v1.21.0) (2021-10-13)



# [1.4.0](https://github.com/tractr/stack/compare/hapify-generate-config-1.3.1...hapify-generate-config-1.4.0) (2021-07-13)


### Features

* add nestjs-file-storage and angular-file-storage libs ([#149](https://github.com/tractr/stack/issues/149)) ([804c4a6](https://github.com/tractr/stack/commit/804c4a6b1062a087804bfa2abec60db62c816269))



## [1.3.1](https://github.com/tractr/stack/compare/hapify-generate-config-1.3.0...hapify-generate-config-1.3.1) (2021-07-08)


### Bug Fixes

* remove nestjs-authentication @generated/all dependency from package.json ([#168](https://github.com/tractr/stack/issues/168)) ([20891bc](https://github.com/tractr/stack/commit/20891bce7697ef834835dff29f24313ac3a09b51))



# [1.3.0](https://github.com/tractr/stack/compare/hapify-generate-config-1.2.0...hapify-generate-config-1.3.0) (2021-07-08)

### Features

- force entity back relation naming
  ([#144](https://github.com/tractr/stack/issues/144))
  ([a4aee26](https://github.com/tractr/stack/commit/a4aee269c8ed92c23ff2a9bf2e79a526a777bc08))

# [1.2.0](https://github.com/tractr/stack/compare/hapify-generate-config-1.1.0...hapify-generate-config-1.2.0) (2021-06-24)

### Bug Fixes

- configure the npm release and publish correctly
  ([#143](https://github.com/tractr/stack/issues/143))
  ([b07d8fd](https://github.com/tractr/stack/commit/b07d8fd33330d1d06d0465a9e9d65fb7a0415e1b))

### Features

- create authentication nestjs lib package
  ([#135](https://github.com/tractr/stack/issues/135))
  ([37137dd](https://github.com/tractr/stack/commit/37137ddbab63e4aa8b3cac270d4564c722fed5ba))

# [1.1.0](https://github.com/tractr/stack/compare/hapify-generate-config-1.0.5...hapify-generate-config-1.1.0) (2021-06-16)

### Features

- change stack lerna repository to nx workspace
  ([#119](https://github.com/tractr/stack/issues/119))
  ([e9104bd](https://github.com/tractr/stack/commit/e9104bde081619c0f3752bb9d129e19d1d6bda5d))

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## @tractr/hapify-generate-config [1.0.5](https://github.com/tractr/stack/compare/@tractr/hapify-generate-config@1.0.4...@tractr/hapify-generate-config@1.0.5) (2021-04-16)

### Bug Fixes

- hapify config precedence ([#44](https://github.com/tractr/stack/issues/44))
  ([c27a1e9](https://github.com/tractr/stack/commit/c27a1e98cac9bb94869051101c34f30e524e1e9a)),
  closes [#8](https://github.com/tractr/stack/issues/8)
  [#8](https://github.com/tractr/stack/issues/8)

## @tractr/hapify-generate-config [1.0.4](https://github.com/tractr/stack/compare/@tractr/hapify-generate-config@1.0.3...@tractr/hapify-generate-config@1.0.4) (2021-03-08)

### Bug Fixes

- rewrite npm packages files list and rename folder to match with the npm
  package name
  ([c7e352c](https://github.com/tractr/stack/commit/c7e352cd2406d8f76c001b670671af98e23c10f8))

## @tractr/hapify-generate-config [1.0.3](https://github.com/tractr/stack/compare/@tractr/hapify-generate-config@1.0.2...@tractr/hapify-generate-config@1.0.3) (2021-03-08)

### Bug Fixes

- change prepare scripts to prepublishOnly and not build when installing
  packages
  ([17366ad](https://github.com/tractr/stack/commit/17366ada324f19b5a853a96a01f42996a43385b8))

## @tractr/hapify-generate-config [1.0.2](https://github.com/tractr/stack/compare/@tractr/hapify-generate-config@1.0.1...@tractr/hapify-generate-config@1.0.2) (2021-03-04)

### Bug Fixes

- replace postinstall script to prepare to build packages/ only on local
  ([5d96852](https://github.com/tractr/stack/commit/5d96852f2e753c78c62248c3f9846e6e0e94c07c))

## @tractr/hapify-generate-config [1.0.1](https://github.com/tractr/stack/compare/@tractr/hapify-generate-config@1.0.0...@tractr/hapify-generate-config@1.0.1) (2021-03-04)

### Bug Fixes

- remove postinsall scripts from packages.json
  ([e65748b](https://github.com/tractr/stack/commit/e65748b26a993f0e35bbec960907fcaaa5fe6270))

# @tractr/hapify-generate-config 1.0.0 (2021-03-04)

### Bug Fixes

- add prisma generation into version control and start to configure nestjs-user
  to export files
  ([b621526](https://github.com/tractr/stack/commit/b621526e2a9c7dc5ed5f0a88c8cabffb636c17f7))
- add the rights files into packages to publish to npm registry
  ([760c1f9](https://github.com/tractr/stack/commit/760c1f98da944f39f821c7d4e30847e229bba44d))
- change output directory for hapify config generate
  ([9bb176f](https://github.com/tractr/stack/commit/9bb176f4013817e7db2dddf032d8f92fd06e717a))
- enfore repository settings to match with tractr/stack and allow npm publish
  ([0bd1ea3](https://github.com/tractr/stack/commit/0bd1ea38f5c1fc5f88e5611b214de8418bd59bdc))
- **hapify generation:** fix the path format of hapify files
  ([c091863](https://github.com/tractr/stack/commit/c0918634696ff9848cb6803b8a3ea25daf3e2e92))

### Features

- **model templates:** add model templates for create route
  ([a4d28aa](https://github.com/tractr/stack/commit/a4d28aa52badebd88186158d51ffe78d4c514dbf))
- add script to generate hapify configuration
  ([#20](https://github.com/tractr/stack/issues/20))
  ([36ec9bd](https://github.com/tractr/stack/commit/36ec9bdc73ba1ae3053db3e0c16c1e00b1e0a225))
- create a script to generate configuration files and add an extend capability
  ([#25](https://github.com/tractr/stack/issues/25))
  ([ac75399](https://github.com/tractr/stack/commit/ac75399d87c67f2698946b584408e849fdb1a2f3))
