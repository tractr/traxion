export interface AdminAppGeneratorSchema extends Record<string, unknown> {
  name: string;
  directory?: string;
  npmName?: string;
  reactAdminImportPath: string;
  rextClientImportPath: string;
}
