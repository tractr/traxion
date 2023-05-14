import { ClassDeclaration, SyntaxKind } from 'ts-morph';

export function updatePrismaSelect(resolver: ClassDeclaration) {
  const fieldResolvers = resolver.getInstanceMethods();

  fieldResolvers.forEach((fieldResolver) => {
    const prismaSelect = fieldResolver.getFirstDescendant(
      (node) => node.getText() === 'PrismaSelect',
    );

    if (!prismaSelect) throw new Error(`No PrismaSelect found`);
    const identifier = prismaSelect.asKind(SyntaxKind.Identifier);

    if (!identifier) throw new Error(`PrismaSelect is not an Identifier`);

    const prismaNewExpression = identifier.getFirstAncestorByKind(
      SyntaxKind.NewExpression,
    );

    if (!prismaNewExpression)
      throw new Error(`No PrismaSelect new expression found`);

    prismaNewExpression.addArgument('{ defaultFields: this.defaultFields }');
  });
}
