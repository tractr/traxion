import {
  ClassProvider,
  DynamicModule,
  ModuleMetadata,
  Type,
} from '@nestjs/common';
import { isClass } from '@tractr/hapify-plugin-nestjs-core';

import { getMetadataFromModule } from './module-metadata.helper';
import { uniqueConcat } from './unique-array.helper';

export interface ModuleOverrideMetadata {
  // eslint-disable-next-line no-use-before-define
  dependencies?: Array<typeof ModuleOverride>;
  imports?: ModuleMetadata['imports'];
  exports?: ModuleMetadata['exports'];
  providers?: ModuleMetadata['providers'];
  controllers?: Array<Type | ClassProvider>;
}

export class ModuleOverride implements ModuleOverrideMetadata {
  static imports?: ModuleMetadata['imports'];

  static exports?: ModuleMetadata['exports'];

  static providers?: ModuleMetadata['providers'];

  static controllers?: ModuleMetadata['controllers'];

  static dependencies?: Array<typeof ModuleOverride>;

  static register(options: ModuleOverrideMetadata = {}): DynamicModule {
    return {
      module: this,
      ...this.mergeMetadata(this, options),
    };
  }

  static mergeMetadata(
    metadata: ModuleOverrideMetadata,
    override: ModuleOverrideMetadata,
  ): ModuleMetadata {
    const moduleMetadata: ModuleOverrideMetadata = {
      imports: metadata.imports,
      exports: metadata.exports,
      providers: metadata.providers,
      controllers: metadata.controllers,
    };
    return this.extractDependencies(
      uniqueConcat<typeof ModuleOverride>(
        metadata.dependencies ?? [],
        override.dependencies ?? [],
      ),
    )
      .concat(getMetadataFromModule(metadata))
      .concat(moduleMetadata)
      .concat(override)
      .reduce<Required<ModuleMetadata>>(
        (acc, { imports, exports, providers, controllers }) => {
          if (imports) acc.imports.push(...imports);
          if (exports) acc.exports.push(...exports);
          if (providers) acc.providers.push(...providers);
          if (controllers)
            acc.controllers.push(
              ...this.mergeControllers(
                (metadata.controllers ?? []).concat(controllers),
              ),
            );
          return acc;
        },
        {
          imports: [],
          exports: [],
          providers: [],
          controllers: [],
        },
      );
  }

  static mergeControllers(
    controllers: ModuleOverrideMetadata['controllers'],
  ): NonNullable<ModuleMetadata['controllers']> {
    const controllersMap: Map<
      ClassProvider['provide'],
      ClassProvider['useClass']
    > = (controllers ?? []).reduce((acc, controller) => {
      if (isClass(controller)) {
        acc.set(controller as Type, controller as Type);
        return acc;
      }

      const { provide, useClass } = controller as ClassProvider;
      acc.set(provide, useClass);
      return acc;
    }, new Map());

    return [...controllersMap.values()];
  }

  static extractDependencies(
    dependencies: Array<typeof ModuleOverride>,
    excludeDependencies: Set<typeof ModuleOverride> = new Set(),
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
