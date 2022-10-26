export interface TargetGenerateGeneratorSchema {
  project: string;
  inputHapifyGeneratedPath?: string;
  outputGeneratedPath?: string;
  moveGeneratedFiles?: boolean;
  format?: boolean;
  updateImportPath?: boolean;
  cleanFirst?: boolean;
  skipInstall?: boolean;
}
