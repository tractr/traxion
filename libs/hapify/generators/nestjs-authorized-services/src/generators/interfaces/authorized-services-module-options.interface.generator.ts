import { Project } from 'ts-morph';

export function generateAuthorizedServicesModuleOptionsSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `authorized-services-module-options.interface.ts`;
  const filePath = `${path}/interfaces/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addTypeAlias({
    isExported: true,
    name: 'DefaultOwnershipSelect',
    type: 'Record<string, Record<string, boolean>>',
  });

  sourceFile.addTypeAlias({
    isExported: true,
    name: 'AuthorizedServicesModuleOptions',
    type: '{ defaultOwnershipSelect?: DefaultOwnershipSelect }',
  });
}
