import { plural } from "pluralize";
import { DecoratorStructure, OptionalKind } from "ts-morph";

import { Field, kebab, Model, pascal } from '@trxn/hapify-core';

// TODO: add import for AngularModelsValidatorsModule
export const generateDecorator = (model: Model, projectScope:string): OptionalKind<DecoratorStructure>[] => {
  const imports = model.fields.map((f) => `${pascal(model.name)}${pascal(f.name)}Component`);
  return [
    {
      name: 'Component',
      arguments: [
        `{
    standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    ${imports.toString()}
  ],
    selector: '${projectScope}-${kebab(model.name)}-form-control',
    templateUrl: './${kebab(model.name)}-form-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    }`,
      ],
    },
  ]};