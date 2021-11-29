# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [1.25.0](https://github.com/tractr/stack/compare/v1.24.0...v1.25.0) (2021-11-29)



# [1.24.0](https://github.com/tractr/stack/compare/v1.23.2...v1.24.0) (2021-11-18)



## [1.23.2](https://github.com/tractr/stack/compare/v1.23.1...v1.23.2) (2021-11-16)


### Bug Fixes

* update type signature of model services to allow async utilisation and override ([#306](https://github.com/tractr/stack/issues/306)) ([c12d2fe](https://github.com/tractr/stack/commit/c12d2fe217b9f0041777a986121dfdc2258bfebf))



## [1.23.1](https://github.com/tractr/stack/compare/v1.23.0...v1.23.1) (2021-11-09)



# [1.23.0](https://github.com/tractr/stack/compare/v1.22.4...v1.23.0) (2021-11-03)



## [1.22.4](https://github.com/tractr/stack/compare/v1.22.3...v1.22.4) (2021-10-29)



## [1.22.3](https://github.com/tractr/stack/compare/v1.22.2...v1.22.3) (2021-10-28)



## [1.22.2](https://github.com/tractr/stack/compare/v1.22.1...v1.22.2) (2021-10-28)



## [1.22.1](https://github.com/tractr/stack/compare/v1.22.0...v1.22.1) (2021-10-27)



# [1.22.0](https://github.com/tractr/stack/compare/v1.21.4...v1.22.0) (2021-10-19)



## [1.21.4](https://github.com/tractr/stack/compare/v1.21.3...v1.21.4) (2021-10-15)



## [1.21.3](https://github.com/tractr/stack/compare/v1.21.2...v1.21.3) (2021-10-15)



## [1.21.2](https://github.com/tractr/stack/compare/v1.21.1...v1.21.2) (2021-10-15)



## [1.21.1](https://github.com/tractr/stack/compare/v1.21.0...v1.21.1) (2021-10-13)



# [1.21.0](https://github.com/tractr/stack/compare/v1.20.1...v1.21.0) (2021-10-13)



## [1.16.1](https://github.com/tractr/stack/compare/nestjs-authentication-1.16.0...nestjs-authentication-1.16.1) (2021-09-13)


### Bug Fixes

* add template language option to true when sending password recovery ([#270](https://github.com/tractr/stack/issues/270)) ([3c05772](https://github.com/tractr/stack/commit/3c05772a521ef260aaa024d067487da8956d59c6))



# [1.16.0](https://github.com/tractr/stack/compare/nestjs-authentication-1.15.6...nestjs-authentication-1.16.0) (2021-09-07)


### Bug Fixes

* remove error throwing when user not found on request password change ([#267](https://github.com/tractr/stack/issues/267)) ([50dadb4](https://github.com/tractr/stack/commit/50dadb4ece37047f0af7a8816d52bbb22e370e00))


### Features

* add the option to pass variables to the email when requesting new password ([#264](https://github.com/tractr/stack/issues/264)) ([c593657](https://github.com/tractr/stack/commit/c5936570c32ea200da0caf29f1a1aae6cf0449ea))



## [1.15.6](https://github.com/tractr/stack/compare/nestjs-authentication-1.15.5...nestjs-authentication-1.15.6) (2021-08-10)


### Bug Fixes

* delete double hash of password ([#226](https://github.com/tractr/stack/issues/226)) ([1db423c](https://github.com/tractr/stack/commit/1db423c4b9fcd106a9542fc42b2a09b3300f5d1a))



## [1.15.5](https://github.com/tractr/stack/compare/nestjs-authentication-1.15.4...nestjs-authentication-1.15.5) (2021-08-10)


### Bug Fixes

* angular authentication add password service in providers ([#225](https://github.com/tractr/stack/issues/225)) ([c261630](https://github.com/tractr/stack/commit/c2616304048ad908cbfcc4ab4e0c3a47c351b1d5))



## [1.15.4](https://github.com/tractr/stack/compare/nestjs-authentication-1.15.3...nestjs-authentication-1.15.4) (2021-08-06)


### Bug Fixes

* reexport correctly password service to be use outsite authentication module ([#220](https://github.com/tractr/stack/issues/220)) ([972b1b7](https://github.com/tractr/stack/commit/972b1b7c39bcf0eb2dedcb683990b43c4e390904))



## [1.15.3](https://github.com/tractr/stack/compare/nestjs-authentication-1.15.2...nestjs-authentication-1.15.3) (2021-08-03)


### Bug Fixes

* add reset request options to use it outside of the scope of the reset password (init password) ([#214](https://github.com/tractr/stack/issues/214)) ([63d9d97](https://github.com/tractr/stack/commit/63d9d97ff0155a4ab8a7fb72bfa361da1c30e3e4))



## [1.15.2](https://github.com/tractr/stack/compare/nestjs-authentication-1.15.1...nestjs-authentication-1.15.2) (2021-07-30)



## [1.15.1](https://github.com/tractr/stack/compare/nestjs-authentication-1.15.0...nestjs-authentication-1.15.1) (2021-07-28)



# [1.15.0](https://github.com/tractr/stack/compare/nestjs-authentication-1.14.4...nestjs-authentication-1.15.0) (2021-07-28)


### Features

* add casl packages to the stack to get a right policy via hapify ([#184](https://github.com/tractr/stack/issues/184)) ([cc241c1](https://github.com/tractr/stack/commit/cc241c1f3e737febadb5ecb90113732be8088d76))
* add password recovery to the authentication process ([#191](https://github.com/tractr/stack/issues/191)) ([2f33209](https://github.com/tractr/stack/commit/2f332091d96728e8e407a20b781e9816344bca7b))
* add prisma middleware to crypt the password field and to exclude by default from all query ([#171](https://github.com/tractr/stack/issues/171)) ([ddb3a23](https://github.com/tractr/stack/commit/ddb3a234e52b31c1402fca2fed7b32f567d4ea3b))



## [1.14.4](https://github.com/tractr/stack/compare/nestjs-authentication-1.14.3...nestjs-authentication-1.14.4) (2021-07-21)


### Bug Fixes

* change module options factory typing ([#196](https://github.com/tractr/stack/issues/196)) ([9a55c71](https://github.com/tractr/stack/commit/9a55c71bd516b0812c560aecd91d7d2ebdb6c533))



## [1.14.3](https://github.com/tractr/stack/compare/nestjs-authentication-1.14.2...nestjs-authentication-1.14.3) (2021-07-19)


### Bug Fixes

* update packages to get a module options factory that can set defaults & validate front & back ([#192](https://github.com/tractr/stack/issues/192)) ([3975d36](https://github.com/tractr/stack/commit/3975d3690f82221ce1f207acff0ae3f63346eca5))



## [1.14.2](https://github.com/tractr/stack/compare/nestjs-authentication-1.14.1...nestjs-authentication-1.14.2) (2021-07-15)


### Bug Fixes

* angular config build correctly ([#190](https://github.com/tractr/stack/issues/190)) ([bd8265b](https://github.com/tractr/stack/commit/bd8265bbf6f02c76e3f94242dce9b18cf5cd3653))



## [1.14.1](https://github.com/tractr/stack/compare/nestjs-authentication-1.14.0...nestjs-authentication-1.14.1) (2021-07-14)



# [1.14.0](https://github.com/tractr/stack/compare/nestjs-authentication-1.13.1...nestjs-authentication-1.14.0) (2021-07-13)


### Features

* add nestjs-file-storage and angular-file-storage libs ([#149](https://github.com/tractr/stack/issues/149)) ([804c4a6](https://github.com/tractr/stack/commit/804c4a6b1062a087804bfa2abec60db62c816269))



## [1.13.1](https://github.com/tractr/stack/compare/nestjs-authentication-1.13.0...nestjs-authentication-1.13.1) (2021-07-13)


### Bug Fixes

* remove all reference to [@generated](https://github.com/generated) from the generated files and only use the relative paths ([#172](https://github.com/tractr/stack/issues/172)) ([8117df7](https://github.com/tractr/stack/commit/8117df7e58fd3ef4b0e9e051d1235c19b361149b))



# [1.13.0](https://github.com/tractr/stack/compare/nestjs-authentication-1.12.3...nestjs-authentication-1.13.0) (2021-07-12)


### Features

* update all package json dependencies ([#167](https://github.com/tractr/stack/issues/167)) ([aee9606](https://github.com/tractr/stack/commit/aee96067b70286145162f57184a37f25dce1d274))



## [1.12.3](https://github.com/tractr/stack/compare/nestjs-authentication-1.12.2...nestjs-authentication-1.12.3) (2021-07-08)


### Bug Fixes

* remove nestjs-authentication @generated/all dependency from package.json ([#168](https://github.com/tractr/stack/issues/168)) ([20891bc](https://github.com/tractr/stack/commit/20891bce7697ef834835dff29f24313ac3a09b51))



## [1.12.2](https://github.com/tractr/stack/compare/nestjs-authentication-1.12.1...nestjs-authentication-1.12.2) (2021-07-08)

### Bug Fixes

- update problematique templates and peerdependencies package json
  ([#166](https://github.com/tractr/stack/issues/166))
  ([198ab59](https://github.com/tractr/stack/commit/198ab592bd7e73640b583ca38c61f88e4db432f6))

## [1.12.1](https://github.com/tractr/stack/compare/nestjs-authentication-1.12.0...nestjs-authentication-1.12.1) (2021-07-05)

### Bug Fixes

- update integration test and fix the way the cookie are handled
  ([#152](https://github.com/tractr/stack/issues/152))
  ([5285dab](https://github.com/tractr/stack/commit/5285dab9feb04cbe70e3e5eaf48d003f8513ce02))

# [1.12.0](https://github.com/tractr/stack/compare/nestjs-authentication-1.11.1...nestjs-authentication-1.12.0) (2021-06-24)

### Features

- change generated library configurations
  ([#146](https://github.com/tractr/stack/issues/146))
  ([3ee951e](https://github.com/tractr/stack/commit/3ee951e998b6e7d4bcbf9f66d4216ce155958cea))
- create authentication nestjs lib package
  ([#135](https://github.com/tractr/stack/issues/135))
  ([37137dd](https://github.com/tractr/stack/commit/37137ddbab63e4aa8b3cac270d4564c722fed5ba))
