import { ClassDeclaration } from 'ts-morph';

export function removeAllNestedCreateField(classDeclaration: ClassDeclaration) {
  classDeclaration.getProperties().forEach((propertyDeclaration) => {
    const name = propertyDeclaration.getName();
    // If the property is a field
    if (name !== 'connect' && name !== 'set' && name !== 'disconnect') {
      // Remove it
      propertyDeclaration.remove();
    }
  });
}
