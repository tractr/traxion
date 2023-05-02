import { Project, SyntaxKind } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: `${__dirname}/../tsconfig.app.json`,
});

const resolverFile = project.getSourceFileOrThrow(
  `${__dirname}/nestjs-authorized-resolvers/resolvers/user.resolver.ts`,
);

const resolverClass = resolverFile.getClassOrThrow('UserResolver');

const props = resolverClass.getInstanceProperties();

props.forEach((prop) => {
  prop.findReferencesAsNodes().forEach((node) => {
    const callExpression = node.getFirstAncestorByKind(
      SyntaxKind.CallExpression,
    );

    if (callExpression) {
      callExpression.addArgument('abilities');
    }
  });
});
