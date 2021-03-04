import { ClassProvider, ModuleMetadata, Type } from '@nestjs/common';
import { Merge } from 'ts-essentials';

export type PackedAll<T> = {
  [K in keyof T]: Array<T[K]>;
};

export type Unpacked<T> = T extends (infer U)[] ? U : never;

export type UnpackedAll<T> = {
  [K in keyof T]: Unpacked<T[K]>;
};

export interface ModuleOverrideMetadata
  extends Omit<ModuleMetadata, 'controllers'> {
  dependencies?: Array<ModuleOverrideMetadata>;
  controllers?: Array<Type | ClassProvider>;
}

export type ModuleOverrideMetadataDependencies<T> = T extends {
  dependencies: (infer U)[];
}
  ? U
  : never;

export type ModuleOverrideMetadataDeepDependencies<
  T extends ModuleOverrideMetadata
> = ModuleOverrideMetadataDependencies<T> extends {
  dependencies: ModuleOverrideMetadata[];
}
  ?
      | ModuleOverrideMetadataDependencies<T>
      | ModuleOverrideMetadataDeepDependencies<
          ModuleOverrideMetadataDependencies<T>
        >
  : ModuleOverrideMetadataDependencies<T>;

export type PickModuleOverrideMetadataProperties<
  T extends ModuleOverrideMetadata
> = {
  [K in keyof ModuleOverrideMetadata]: T[K];
};

export type MappedModuleOverrideMetadata<
  T extends ModuleOverrideMetadata
> = PackedAll<
  PickModuleOverrideMetadataProperties<
    Merge<
      Record<string, never>,
      UnpackedAll<ModuleOverrideMetadataDeepDependencies<T>>
    >
  >
>;

export type OnlyClassProviderLikeProperties<T> = {
  [K in keyof T]: Extract<T[K], { provide: string; useClass: unknown }>;
};

export type StrictMappedModuleOverrideMetadata<
  T
> = OnlyClassProviderLikeProperties<MappedModuleOverrideMetadata<T>>;
