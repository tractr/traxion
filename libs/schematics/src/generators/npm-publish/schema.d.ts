export interface NpmPublishGeneratorSchema {
  project: string;
  repository: string;
  registry?: string;
  access?: string;
}
