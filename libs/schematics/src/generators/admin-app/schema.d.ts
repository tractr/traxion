export interface AdminAppGeneratorSchema {
  name: string;
  directory?: string;
  npmName?: string;
  reactAdminImportPath: string;
  rextClientImportPath: string;
}

export interface AdminAppGeneratorSchemaWithExtra
  extends AdminAppGeneratorSchema,
    Record<string, unknown> {}
