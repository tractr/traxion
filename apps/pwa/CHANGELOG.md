# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [1.9.2](https://github.com/tractr/stack/compare/pwa-1.9.1...pwa-1.9.2) (2021-07-19)


### Bug Fixes

* update packages to get a module options factory that can set defaults & validate front & back ([#192](https://github.com/tractr/stack/issues/192)) ([3975d36](https://github.com/tractr/stack/commit/3975d3690f82221ce1f207acff0ae3f63346eca5))



## [1.9.1](https://github.com/tractr/stack/compare/pwa-1.9.0...pwa-1.9.1) (2021-07-14)



# [1.9.0](https://github.com/tractr/stack/compare/pwa-1.8.0...pwa-1.9.0) (2021-07-14)


### Features

* Missing form field ([#185](https://github.com/tractr/stack/issues/185)) ([e2a1c49](https://github.com/tractr/stack/commit/e2a1c49bc2c9548ef8be719f212fa0159c5bcc01))



# [1.8.0](https://github.com/tractr/stack/compare/pwa-1.7.1...pwa-1.8.0) (2021-07-13)


### Features

* add nestjs-file-storage and angular-file-storage libs ([#149](https://github.com/tractr/stack/issues/149)) ([804c4a6](https://github.com/tractr/stack/commit/804c4a6b1062a087804bfa2abec60db62c816269))



## [1.7.1](https://github.com/tractr/stack/compare/pwa-1.7.0...pwa-1.7.1) (2021-07-13)


### Bug Fixes

* remove all reference to [@generated](https://github.com/generated) from the generated files and only use the relative paths ([#172](https://github.com/tractr/stack/issues/172)) ([8117df7](https://github.com/tractr/stack/commit/8117df7e58fd3ef4b0e9e051d1235c19b361149b))



# [1.7.0](https://github.com/tractr/stack/compare/pwa-1.6.2...pwa-1.7.0) (2021-07-12)


### Features

* update all package json dependencies ([#167](https://github.com/tractr/stack/issues/167)) ([aee9606](https://github.com/tractr/stack/commit/aee96067b70286145162f57184a37f25dce1d274))



## [1.6.2](https://github.com/tractr/stack/compare/pwa-1.6.1...pwa-1.6.2) (2021-07-08)


### Bug Fixes

* remove nestjs-authentication @generated/all dependency from package.json ([#168](https://github.com/tractr/stack/issues/168)) ([20891bc](https://github.com/tractr/stack/commit/20891bce7697ef834835dff29f24313ac3a09b51))



## [1.6.1](https://github.com/tractr/stack/compare/pwa-1.6.0...pwa-1.6.1) (2021-07-07)

### Bug Fixes

- use the same PORT env to the api and the pwa proxy
  ([#164](https://github.com/tractr/stack/issues/164))
  ([85c150d](https://github.com/tractr/stack/commit/85c150db70e6c5138582902a8e85d263257204f9))

# [1.6.0](https://github.com/tractr/stack/compare/pwa-1.5.0...pwa-1.6.0) (2021-06-30)

### Bug Fixes

- add transform string to int decorator to query, body and params
  ([#150](https://github.com/tractr/stack/issues/150))
  ([ee3fcd6](https://github.com/tractr/stack/commit/ee3fcd68aff87db2c09e77dc7e930f36dcab0a8b))
- update dockerfile to be built and deploy by the ci
  ([d71f395](https://github.com/tractr/stack/commit/d71f395ae0fc21506f34ea8313ee1fecf63dd4fc))

### Features

- add apps version and release back to get docker tags
  ([84332a5](https://github.com/tractr/stack/commit/84332a5fa01a2352d30a7d3674f1916314483c3c))

# [1.5.0](https://github.com/tractr/stack/compare/pwa-1.4.2...pwa-1.5.0) (2021-06-16)

### Features

- change stack lerna repository to nx workspace
  ([#119](https://github.com/tractr/stack/issues/119))
  ([e9104bd](https://github.com/tractr/stack/commit/e9104bde081619c0f3752bb9d129e19d1d6bda5d))

# 0.1.0 (2021-06-11)

### Features

- add eslint, prettier, commitlint and hapify configuration packages
  ([#126](https://github.com/tractr/stack/issues/126))
  ([84ab71b](https://github.com/tractr/stack/commit/84ab71b5501b91f77f52949f96d2314020a34524))
- clean all files and make the gitaction test pass
  ([#134](https://github.com/tractr/stack/issues/134))
  ([1d2e8b9](https://github.com/tractr/stack/commit/1d2e8b936933eac7201c9dbe05cd2f5b4bd1638e))
- start a from a fresh install of nx angular-nest workspace
  ([8e5eae5](https://github.com/tractr/stack/commit/8e5eae534c2de9e0adf104f4829fa28ea3478d0e))
