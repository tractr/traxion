export interface PrismaLibraryGeneratorSchema extends Record<string, unknown> {
  directory?: string;
  name: string;
  skipInstall?: boolean;
}
