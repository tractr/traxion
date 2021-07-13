# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [1.4.3](https://github.com/tractr/stack/compare/hapify-templates-models-1.4.2...hapify-templates-models-1.4.3) (2021-07-13)


### Bug Fixes

* remove all reference to [@generated](https://github.com/generated) from the generated files and only use the relative paths ([#172](https://github.com/tractr/stack/issues/172)) ([8117df7](https://github.com/tractr/stack/commit/8117df7e58fd3ef4b0e9e051d1235c19b361149b))



## [1.4.2](https://github.com/tractr/stack/compare/hapify-templates-models-1.4.1...hapify-templates-models-1.4.2) (2021-07-08)


### Bug Fixes

* remove nestjs-authentication @generated/all dependency from package.json ([#168](https://github.com/tractr/stack/issues/168)) ([20891bc](https://github.com/tractr/stack/commit/20891bce7697ef834835dff29f24313ac3a09b51))



## [1.4.1](https://github.com/tractr/stack/compare/hapify-templates-models-1.4.0...hapify-templates-models-1.4.1) (2021-07-08)

### Bug Fixes

- update problematique templates and peerdependencies package json
  ([#166](https://github.com/tractr/stack/issues/166))
  ([198ab59](https://github.com/tractr/stack/commit/198ab592bd7e73640b583ca38c61f88e4db432f6))

# [1.4.0](https://github.com/tractr/stack/compare/hapify-templates-models-1.3.0...hapify-templates-models-1.4.0) (2021-06-24)

### Bug Fixes

- fix enum barrel import in hapify-templates-models
  ([#148](https://github.com/tractr/stack/issues/148))
  ([1ee071b](https://github.com/tractr/stack/commit/1ee071b4099aea367dad3e2f7fcf5c867e38f388))

### Features

- change generated library configurations
  ([#146](https://github.com/tractr/stack/issues/146))
  ([3ee951e](https://github.com/tractr/stack/commit/3ee951e998b6e7d4bcbf9f66d4216ce155958cea))

# [1.3.0](https://github.com/tractr/stack/compare/hapify-templates-models-1.2.4...hapify-templates-models-1.3.0) (2021-06-16)

### Features

- change stack lerna repository to nx workspace
  ([#119](https://github.com/tractr/stack/issues/119))
  ([e9104bd](https://github.com/tractr/stack/commit/e9104bde081619c0f3752bb9d129e19d1d6bda5d))

# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## @tractr/hapify-templates-models [1.2.4](https://github.com/tractr/stack/compare/@tractr/hapify-templates-models@1.2.3...@tractr/hapify-templates-models@1.2.4) (2021-05-21)

### Bug Fixes

- use import type when declaring dtos to avoid circular dependencies
  ([#114](https://github.com/tractr/stack/issues/114))
  ([40e9ca2](https://github.com/tractr/stack/commit/40e9ca2a46e5a075510fce259c066ab9a84adc8c)),
  closes [#113](https://github.com/tractr/stack/issues/113)

## @tractr/hapify-templates-models [1.2.3](https://github.com/tractr/stack/compare/@tractr/hapify-templates-models@1.2.2...@tractr/hapify-templates-models@1.2.3) (2021-05-04)

### Bug Fixes

- update models template to match prisma types for optional fields
  ([#100](https://github.com/tractr/stack/issues/100))
  ([e26c3bb](https://github.com/tractr/stack/commit/e26c3bb1112c4b8bf35f68bbdfa25c9cdca2bd9b))

## @tractr/hapify-templates-models [1.2.2](https://github.com/tractr/stack/compare/@tractr/hapify-templates-models@1.2.1...@tractr/hapify-templates-models@1.2.2) (2021-04-26)

### Bug Fixes

- update case of enums ([#96](https://github.com/tractr/stack/issues/96))
  ([dc9c65b](https://github.com/tractr/stack/commit/dc9c65b1cc55430d1cb7195093ef89f0a5f37ba7))

## @tractr/hapify-templates-models [1.2.1](https://github.com/tractr/stack/compare/@tractr/hapify-templates-models@1.2.0...@tractr/hapify-templates-models@1.2.1) (2021-04-21)

### Bug Fixes

- fix enums import in models and rest dtos templates
  ([#92](https://github.com/tractr/stack/issues/92))
  ([7a8848e](https://github.com/tractr/stack/commit/7a8848ee89784f294dfe3ab7826acb7644687a3c))

# @tractr/hapify-templates-models [1.2.0](https://github.com/tractr/stack/compare/@tractr/hapify-templates-models@1.1.1...@tractr/hapify-templates-models@1.2.0) (2021-04-16)

### Features

- add a new rext-client templates packages to generate a rxjs API client
  ([#75](https://github.com/tractr/stack/issues/75))
  ([fde64d2](https://github.com/tractr/stack/commit/fde64d22cac2d985b3da03a37add56702f50e278))

## @tractr/hapify-templates-models [1.1.1](https://github.com/tractr/stack/compare/@tractr/hapify-templates-models@1.1.0...@tractr/hapify-templates-models@1.1.1) (2021-04-13)

### Bug Fixes

- update model template to handle imports when several relations exists between
  same models ([#78](https://github.com/tractr/stack/issues/78))
  ([832529f](https://github.com/tractr/stack/commit/832529f4122f2d689ce132a8caf8bc035bba5f9c))

# @tractr/hapify-templates-models [1.1.0](https://github.com/tractr/stack/compare/@tractr/hapify-templates-models@1.0.0...@tractr/hapify-templates-models@1.1.0) (2021-04-12)

### Features

- update README of packages to publish new versions
  ([#77](https://github.com/tractr/stack/issues/77))
  ([e6bf415](https://github.com/tractr/stack/commit/e6bf415af3fe5588c15577f047a6262f81c1564f))

# @tractr/hapify-templates-models 1.0.0 (2021-04-07)

### Features

- add hapify-templates-rext-client package
  ([#45](https://github.com/tractr/stack/issues/45))
  ([9de0cb0](https://github.com/tractr/stack/commit/9de0cb0a79256d1b3dc258cf5c121e211687174c))
