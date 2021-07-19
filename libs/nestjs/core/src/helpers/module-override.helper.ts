import {
  ClassProvider,
  DynamicModule,
  ModuleMetadata,
  Type,
} from '@nestjs/common';

import { ModuleOverrideMetadata } from '../interfaces';
import { getMetadataFromModule } from './module-metadata.helper';

import { isClass, uniqueConcat } from '@tractr/common';

export class ModuleOverride implements ModuleOverrideMetadata {
  static imports?: ModuleMetadata['imports'];

  static exports?: ModuleMetadata['exports'];

  static providers?: ModuleMetadata['providers'];

  static controllers?: Array<Type | ClassProvider>;

  static dependencies?: Array<typeof ModuleOverride>;

  /**
   * Take a configuration ModuleOverrideMetadata object, merge it into this class metadata and create
   * a DynamicModule for nestjs
   * @param options A ModuleOverrideMetadata object to override providers and controllers by configuration
   */
  static register(options: ModuleOverrideMetadata = {}): DynamicModule {
    return {
      module: this,
      ...this.mergeMetadata(this, options),
    };
  }

  /**
   * Take two ModuleOverrideMetada and merge them together. The second is meant to override
   * the providers, imports, exports and controllers. This function is looking deep into the
   * dependencies (class static property configuration and @Module metadata) object define by
   * both object and their ModuleOverrideMetadata are merged as well from bottom up.
   *
   * @param metadata A ModuleOverrideMetada
   * @param override A second ModuleOverrideMetada to merge into the first one
   * @returns a ModuleMetadata nestjs object
   */
  static mergeMetadata(
    metadata: ModuleOverrideMetadata,
    override: ModuleOverrideMetadata,
  ): Required<ModuleMetadata> {
    const moduleMetadata: ModuleOverrideMetadata = {
      imports: metadata.imports,
      exports: metadata.exports,
      providers: metadata.providers,
      controllers: metadata.controllers,
    };

    const dynamicModyle = this.extractDependencies(
      uniqueConcat<ModuleOverrideMetadata>(
        metadata.dependencies ?? [],
        override.dependencies ?? [],
      ),
    )
      .concat(getMetadataFromModule(metadata))
      .concat(moduleMetadata)
      .concat(getMetadataFromModule(override))
      .concat(override)
      .reduce<Required<Omit<ModuleOverrideMetadata, 'dependencies'>>>(
        (acc, { imports, exports, providers, controllers }) => {
          if (imports) acc.imports.push(...imports);
          if (exports) acc.exports.push(...exports);
          if (providers) acc.providers.push(...providers);
          if (controllers) acc.controllers.push(...controllers);
          return acc;
        },
        {
          imports: [],
          exports: [],
          providers: [],
          controllers: [],
        },
      );

    return {
      ...dynamicModyle,
      controllers: this.mergeControllers(dynamicModyle.controllers),
    };
  }

  /**
   * Take a controllers list and merge them together.
   * If a controller has the same provide key than an previous one we just override the class
   *
   * @param controllers A controllers list to merge together
   * @returns
   * @example
   * ```js
   *
   * mergeControllers([
   *    Controller1,
   *    Controller2,
   *    { provide: Controller2, useClass: Controller3},
   *    Controller3,
   * ])
   *
   * /* The array is transform to: [
   *    { provide: Controller1, useClass: Controller1},
   *    { provide: Controller2, useClass: Controller2},
   *    { provide: Controller2, useClass: Controller3},
   *    { provide: Controller3, useClass: Controller3},
   * ]
   *  And then to: [Controller1, Controller3, Controller3]
   * *\/
   * ```
   */
  static mergeControllers(
    controllers: ModuleOverrideMetadata['controllers'],
  ): NonNullable<ModuleMetadata['controllers']> {
    const controllersMap: Map<
      ClassProvider['provide'],
      ClassProvider['useClass']
    > = (controllers ?? []).reduce((acc, controller) => {
      if (isClass(controller)) {
        acc.set(controller, controller);
        return acc;
      }

      const { provide, useClass } = controller;
      acc.set(provide, useClass);
      return acc;
    }, new Map());

    return [...controllersMap.values()];
  }

  /**
   * Take a module dependencies list and get all the information about their module definition
   * @param dependencies Dependencies list to iterate over
   * @param excludeDependencies A dependencies list to exclude
   * @returns A ModuleOverrideMetadata list
   */
  static extractDependencies(
    dependencies: Array<ModuleOverrideMetadata>,
    excludeDependencies: Set<ModuleOverrideMetadata> = new Set(),
  ): ModuleOverrideMetadata[] {
    return dependencies
      .filter((dependency) => !excludeDependencies.has(dependency))
      .map((dependency) => {
        excludeDependencies.add(dependency);

        const childMetadata: ModuleOverrideMetadata[] = [];

        if (Array.isArray(dependency.dependencies)) {
          childMetadata.push(
            ...this.extractDependencies(
              dependency.dependencies,
              excludeDependencies,
            ),
          );
        }

        return childMetadata
          .concat(getMetadataFromModule(dependency))
          .concat(dependency);
      })
      .flat();
  }
}
