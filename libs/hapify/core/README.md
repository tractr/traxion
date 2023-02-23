# hapify-core

Library to describe data models in TypeScript.
It also includes helpers to test and filter data models and their fields.

## Data models definition

```typescript
const idField = new NumberBasicField('Id').setPrimary(true).makeNotWritable();

const userModel = new Model('User')
    .addField(new KeyStringField('Id'))
    .addField(new KeyStringField('RoleId'))
    .addField(new RelationField('Role'))
    .addField(new StringBasicField('FirstName').setMaxLength(50))
    .addField(new StringBasicField('LastName').setMaxLength(50))
    .addField(new StringEmailField('Email'))
    .addField(
      new StringPasswordField('Password')
        .setValidationRegex('/([0-9a-z]+)/')
        .makeNotReadable(),
    )
    .addField(
      new StringTextField('Description')
        .setNullable(true)
        .addMetadata('foo', 'bar'),
    )
    .addField(new BooleanField('Enabled').setDefaultValue(false))
    .addField(
      new NumberIntegerField('Credits')
        .setDefaultValue(10)
        .setMax(1000)
        .setNotes('Amount of credits remaining'),
    ),
    
const roleModel = new Model('Role').addField(idField).addField(
  new StringBasicField('Name')
    .setMaxLength(50)
    .setUnique(true)
    .setNotes('Role name'),
)
    .addField(new KeyStringField('Id'))
    .addField(new RelationField('Users'))

const userRoleRelation = new Relation({
  name: 'UserRole',
  referer: {
    model: userModel,
    scalarField: userModel.keyField('RoleId'),
    virtualField: userModel.relationField('Role'),
    cardinality: 'one',
  },
  referee: {
    model: roleModel,
    scalarField: roleModel.keyField('Id'),
    virtualField: roleModel.relationField('users'),
    cardinality: 'many',
  },
})

getRelationFields(model)
getRelationField(model, name);

const project = new Project('app')
  .addModel(userModel)
  .addModel(roleModel)
  .addRelation(userRoleRelation);
```

## Playing with data models

```typescript
const modelsWithPublicSearchAndCount = project.models
  .filter(and(isModelActionPublic('search'), isModelActionPublic('count')));
```

```typescript
const modelsWithDependencyOrSelfReferenced = project.models
  .filter(or(hasDependencies, isSelfReferenced));
```

```typescript
const firstModel = project.models[0];
if (hasOwner(firstModel)) {
  const ownerChain = getOwners(firstModel);
}
```

## Playing with data models fields

```typescript
const firstModel = project.models[0];
const publicStringAndNumberNames = firstModel.fields
  .filter(and(or(isString, isNumber()), isFieldActionPublic('read')))
  .map((field) => kebab(field.name))
  .join(', ');
```
