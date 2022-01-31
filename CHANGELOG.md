# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [1.33.0](https://github.com/tractr/stack/compare/v1.32.1...v1.33.0) (2022-01-20)

### Features

* add custom select to authentication module to populate user fields ([#359](https://github.com/tractr/stack/issues/359)) ([95a48d7](https://github.com/tractr/stack/commit/95a48d76bb9821a44553298ee87ccaa2ec378220))

## [1.32.1](https://github.com/tractr/stack/compare/v1.32.0...v1.32.1) (2022-01-20)

### Bug Fixes

* generation when unique values is null or is an entity ([#360](https://github.com/tractr/stack/issues/360)) ([d3b5f46](https://github.com/tractr/stack/commit/d3b5f4693f9bac7b02099c26d24a3d96eb370e39))

# [1.32.0](https://github.com/tractr/stack/compare/v1.31.0...v1.32.0) (2022-01-07)

### Bug Fixes

* remove hidden field from reading dto ([#356](https://github.com/tractr/stack/issues/356)) ([4f2a629](https://github.com/tractr/stack/commit/4f2a6292fb267d59fbbf5dfc3dba348ff9b8bb50))
* update rext client and publish targets ([#355](https://github.com/tractr/stack/issues/355)) ([72346a2](https://github.com/tractr/stack/commit/72346a216104ffa83f3410610201e7ad533a2f00)), closes [#350](https://github.com/tractr/stack/issues/350)

### Features

* update packages minor version ([#357](https://github.com/tractr/stack/issues/357)) ([17ed0fc](https://github.com/tractr/stack/commit/17ed0fc6cbe3cce829c61ceced65597349b61e7d))

# [1.31.0](https://github.com/tractr/stack/compare/v1.30.0...v1.31.0) (2021-12-21)

### Bug Fixes

* add publish target to hapify-common lib ([#336](https://github.com/tractr/stack/issues/336)) ([1061901](https://github.com/tractr/stack/commit/10619012d309a275333a146a5e5b8a9d25517e3e))
* fix unique value type on templates ([#335](https://github.com/tractr/stack/issues/335)) ([f80a321](https://github.com/tractr/stack/commit/f80a321c18f8b4af8bc0190e44f7675baee54ff9))

### Features

* add casl generation with deep access ([#330](https://github.com/tractr/stack/issues/330)) ([4138c39](https://github.com/tractr/stack/commit/4138c3987444e9dbeb27c846bc2be4d950820538))
* add generate executor schematics ([#334](https://github.com/tractr/stack/issues/334)) ([16173c9](https://github.com/tractr/stack/commit/16173c999f27cc8a503ba8d261c6e26553c81001))

# [1.30.0](https://github.com/tractr/stack/compare/v1.29.3...v1.30.0) (2021-12-15)

### Features

* add update import capability when generating the hapify files ([#328](https://github.com/tractr/stack/issues/328)) ([cfde581](https://github.com/tractr/stack/commit/cfde58129f6802b764867e8dd003f71b537c74ce))

## [1.29.3](https://github.com/tractr/stack/compare/v1.29.2...v1.29.3) (2021-12-14)

### Bug Fixes

* update url formater to handle all cases ([#332](https://github.com/tractr/stack/issues/332)) ([7ad0b6f](https://github.com/tractr/stack/commit/7ad0b6fded1b15d24c2975630f7d16b514923d58))

## [1.29.2](https://github.com/tractr/stack/compare/v1.29.1...v1.29.2) (2021-12-14)

### Bug Fixes

* update rext client templates to handle query params ([#331](https://github.com/tractr/stack/issues/331)) ([b54c74d](https://github.com/tractr/stack/commit/b54c74d74cf225b50da36b926817a4efcf9fdde8))

## [1.29.1](https://github.com/tractr/stack/compare/v1.29.0...v1.29.1) (2021-12-09)

### Bug Fixes

* update system field default assignation ([#327](https://github.com/tractr/stack/issues/327)) ([4c9c9f7](https://github.com/tractr/stack/commit/4c9c9f75acf9b7d08c6060e60fddd65913870ce7))

# [1.29.0](https://github.com/tractr/stack/compare/v1.28.5...v1.29.0) (2021-12-07)

### Bug Fixes

* **angular-form:** allow to change fielname in select model ([#297](https://github.com/tractr/stack/issues/297)) ([e457877](https://github.com/tractr/stack/commit/e4578771dea7bba05ed9db75c1c9eee0fc7e2e4d))
* handle correctly prisma errors on the http error layer ([#323](https://github.com/tractr/stack/issues/323)) ([68220da](https://github.com/tractr/stack/commit/68220da4f267845ec83faf71c36ac0ee0b2c315a))
* remove npm cache in gitactions ([#304](https://github.com/tractr/stack/issues/304)) ([2752265](https://github.com/tractr/stack/commit/2752265a401626ea4caac862383c6bff9517c65e))

### Features

* treat unique values on mock ([#322](https://github.com/tractr/stack/issues/322)) ([8437c86](https://github.com/tractr/stack/commit/8437c86fda88fa1e7f7481fea502a90142113dae))
* update angular authentication with dto check ([#324](https://github.com/tractr/stack/issues/324)) ([078c93a](https://github.com/tractr/stack/commit/078c93a54cc778884b2323be392a66f40e0156a0))

## [1.28.5](https://github.com/tractr/stack/compare/v1.28.4...v1.28.5) (2021-12-06)

### Bug Fixes

* fix connection keyword in rest-dto-service ([#325](https://github.com/tractr/stack/issues/325)) ([a5d5639](https://github.com/tractr/stack/commit/a5d5639dad7bb2def6ae7d2ff742d0b87b812cba))

## [1.28.4](https://github.com/tractr/stack/compare/v1.28.3...v1.28.4) (2021-12-03)

### Bug Fixes

* remove User validate nested from authentication options dto ([#321](https://github.com/tractr/stack/issues/321)) ([fc3d8cf](https://github.com/tractr/stack/commit/fc3d8cfae3cf88f1e5ba0dbd38f4753e7e7830e5))

## [1.28.3](https://github.com/tractr/stack/compare/v1.28.2...v1.28.3) (2021-12-03)

### Bug Fixes

* use typeof instead of the dto to type the angular injection token ([#320](https://github.com/tractr/stack/issues/320)) ([4653bdf](https://github.com/tractr/stack/commit/4653bdfe66d458949cea94a61bf615ac703a4cd4))

## [1.28.2](https://github.com/tractr/stack/compare/v1.28.1...v1.28.2) (2021-12-03)

### Bug Fixes

* **hapify-templates-nestjs-nodels-rest:** change connect to set operator to allow relation deletion ([#319](https://github.com/tractr/stack/issues/319)) ([ec17160](https://github.com/tractr/stack/commit/ec17160f49dedb83ecc8904792ed8f968b8f521e))

## [1.28.1](https://github.com/tractr/stack/compare/v1.28.0...v1.28.1) (2021-12-02)

# [1.28.0](https://github.com/tractr/stack/compare/v1.27.2...v1.28.0) (2021-12-02)

### Features

* implements object type in hapify ([#316](https://github.com/tractr/stack/issues/316)) ([7dfa584](https://github.com/tractr/stack/commit/7dfa58462f770b0a45346a873e7a8a9e8d413e1f))

## [1.27.2](https://github.com/tractr/stack/compare/v1.27.1...v1.27.2) (2021-12-01)

### Bug Fixes

* replace unallowed caractere to the s3 store for deployment ([#315](https://github.com/tractr/stack/issues/315)) ([29f6776](https://github.com/tractr/stack/commit/29f67765c83e60b782c51c4c964b6f9381772144))

## [1.27.1](https://github.com/tractr/stack/compare/v1.27.0...v1.27.1) (2021-11-30)

### Bug Fixes

* add limitation length to s3 and deployment trigger ([#314](https://github.com/tractr/stack/issues/314)) ([1108d98](https://github.com/tractr/stack/commit/1108d98eb91796c166bff41d3d2722e704db45c9))

# [1.27.0](https://github.com/tractr/stack/compare/v1.26.0...v1.27.0) (2021-11-30)

### Features

* remove generated code from nestjs authentication and angular authentication package ([#312](https://github.com/tractr/stack/issues/312)) ([4fa7bfa](https://github.com/tractr/stack/commit/4fa7bfa536d1accb483fa8b83f93c9395de5e1e0)), closes [#313](https://github.com/tractr/stack/issues/313)

# [1.26.0](https://github.com/tractr/stack/compare/v1.25.0...v1.26.0) (2021-11-30)

### Features

* add hapify field type datetime and time ([#310](https://github.com/tractr/stack/issues/310)) ([60d4e81](https://github.com/tractr/stack/commit/60d4e819d42d65011d235596f43979d80c8c885e))

# [1.25.0](https://github.com/tractr/stack/compare/v1.24.0...v1.25.0) (2021-11-29)

### Bug Fixes

* add eslint and prettier schematics ([#294](https://github.com/tractr/stack/issues/294)) ([38ec874](https://github.com/tractr/stack/commit/38ec8749579d829b4e07d880624de65c99f1b0e7))
* update workspace release target from :version to :release ([932310f](https://github.com/tractr/stack/commit/932310f1a6350f70a00ed98c6ad1b1605d43a945))

### Features

* add date and time picker into angular components ([#305](https://github.com/tractr/stack/issues/305)) ([aa2b472](https://github.com/tractr/stack/commit/aa2b472627393e331b138c8d8d50e7d95095e999))
* add github workflows generator ([#309](https://github.com/tractr/stack/issues/309)) ([f8f7619](https://github.com/tractr/stack/commit/f8f7619ef08520f5b6ddc293900548cda9e0bb90))
* improve hapify field type string and number ([#308](https://github.com/tractr/stack/issues/308)) ([0ca4896](https://github.com/tractr/stack/commit/0ca48962ae4be440a76f8b77df1a63a68b51311b))
* **terraform-component-deployment-trigger:** limit rule name to 64 chars ([#311](https://github.com/tractr/stack/issues/311)) ([9719698](https://github.com/tractr/stack/commit/97196984c7b9c3a8b4f0f1f373e159aa790c67ea))

# [1.24.0](https://github.com/tractr/stack/compare/v1.23.2...v1.24.0) (2021-11-18)

### Features

* add prisma exceptions interceptor to throw the right http exceptions ([#307](https://github.com/tractr/stack/issues/307)) ([274dc99](https://github.com/tractr/stack/commit/274dc993660c1cef001eb7fa139a39ec10c7453c))

## [1.23.2](https://github.com/tractr/stack/compare/v1.23.1...v1.23.2) (2021-11-16)

### Bug Fixes

* update type signature of model services to allow async utilisation and override ([#306](https://github.com/tractr/stack/issues/306)) ([c12d2fe](https://github.com/tractr/stack/commit/c12d2fe217b9f0041777a986121dfdc2258bfebf))

## [1.23.1](https://github.com/tractr/stack/compare/v1.23.0...v1.23.1) (2021-11-09)

### Bug Fixes

* **angular-tools:** fix import BrowserModule ([#303](https://github.com/tractr/stack/issues/303)) ([d2ec163](https://github.com/tractr/stack/commit/d2ec1635f4b8d2ad3917defc2e14bf92ae533ec8))

# [1.23.0](https://github.com/tractr/stack/compare/v1.22.4...v1.23.0) (2021-11-03)

### Features

* fix templates imports and add notes to models templates ([#301](https://github.com/tractr/stack/issues/301)) ([f958dab](https://github.com/tractr/stack/commit/f958dabd49f164b493c2783883a8d52207d46068))

## [1.22.4](https://github.com/tractr/stack/compare/v1.22.3...v1.22.4) (2021-10-29)

### Bug Fixes

* make the react admin accessible only by user with admin privileges ([#300](https://github.com/tractr/stack/issues/300)) ([82afebc](https://github.com/tractr/stack/commit/82afebc421fd8bc76e6bae24a86937ab277fea07))

## [1.22.3](https://github.com/tractr/stack/compare/v1.22.2...v1.22.3) (2021-10-28)

### Bug Fixes

* exclude only the internal field ([#299](https://github.com/tractr/stack/issues/299)) ([cae52f5](https://github.com/tractr/stack/commit/cae52f50305cf7d65775fdc75c1d7de9e6ba3246))

## [1.22.2](https://github.com/tractr/stack/compare/v1.22.1...v1.22.2) (2021-10-28)

### Bug Fixes

* make react admin update models ([#298](https://github.com/tractr/stack/issues/298)) ([a2c276d](https://github.com/tractr/stack/commit/a2c276dd2f79560b9a630b9933f13da3fc4e448e))

## [1.22.1](https://github.com/tractr/stack/compare/v1.22.0...v1.22.1) (2021-10-27)

### Bug Fixes

* **common:** fix validate options ([#296](https://github.com/tractr/stack/issues/296)) ([e8bfcce](https://github.com/tractr/stack/commit/e8bfccea46fb12d4baee6d7a346c108cf8566880))

# [1.22.0](https://github.com/tractr/stack/compare/v1.21.4...v1.22.0) (2021-10-19)

### Bug Fixes

* **terraform:** remove cross peer deps ([#293](https://github.com/tractr/stack/issues/293)) ([cd9c62b](https://github.com/tractr/stack/commit/cd9c62bbf06ff3ec43b8d3f16a4a9b04f5be90f8))

### Features

* **terraform:** add backups for Postgres service ([#292](https://github.com/tractr/stack/issues/292)) ([55c5243](https://github.com/tractr/stack/commit/55c5243fa4efa39d67aed81341042a7163bd7568))

## [1.21.4](https://github.com/tractr/stack/compare/v1.21.3...v1.21.4) (2021-10-15)

### Bug Fixes

* react admin fetch info ([3856977](https://github.com/tractr/stack/commit/3856977d1418c06e1288146305175ab415d8cbf2))

## [1.21.3](https://github.com/tractr/stack/compare/v1.21.2...v1.21.3) (2021-10-15)

### Bug Fixes

* add order in publish target to deploy dependency after dependency ([e78f05f](https://github.com/tractr/stack/commit/e78f05fe38aa04b804cc7fd56bcc38a5158047a6))

## [1.21.2](https://github.com/tractr/stack/compare/v1.21.1...v1.21.2) (2021-10-15)

### Bug Fixes

* add assets files to react admin package ([#282](https://github.com/tractr/stack/issues/282)) ([fef6199](https://github.com/tractr/stack/commit/fef619986284408834f8579c5272088fd19a6254))
* terraform s3 public read ([#289](https://github.com/tractr/stack/issues/289)) ([fca5bed](https://github.com/tractr/stack/commit/fca5bed8cb7987e87a83e2bdeee32eb291d66262))
* update relase workflow to match the sync version process ([d68f2c3](https://github.com/tractr/stack/commit/d68f2c379d3cbe24812e83a908ee847a897f8c05))
* update workflow release version ([#290](https://github.com/tractr/stack/issues/290)) ([a8ba438](https://github.com/tractr/stack/commit/a8ba438395100073b9bf0fb1e101cf50202cfc6c))

## [1.21.1](https://github.com/tractr/stack/compare/v1.21.0...v1.21.1) (2021-10-13)

# [1.21.0](https://github.com/tractr/stack/compare/v1.20.1...v1.21.0) (2021-10-13)

### Features

* update workspace to use sync dependencies between packages ([e31e35c](https://github.com/tractr/stack/commit/e31e35cc475ecd24ed625965a1dfd97514063ffb))
