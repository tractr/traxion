import { DeepRequired } from 'ts-essentials';

type Node = {
  name: string;
  metadata?: Record<string, string>;
  notes?: string;
};

// On déclare toutes les contraintes possibles
type Constraint<Key extends string, Type> = {
  constraint: { [key in Key]: Type };
};
type OptionalConstraint<Key extends string, Type> = {
  constraint: { [key in Key]?: Type };
};

type Property<Key extends string> = {
  property: { [key in Key]: boolean };
};

type SearchableProperty = Property<'searchable'>;
type SortableProperty = Property<'sortable'>;

type MinLengthConstraint = OptionalConstraint<'minLength', number>;
type MaxLengthConstraint = OptionalConstraint<'maxLength', number>;

// On construit les fields à partir des contraintes
type VoidObject = {
  /* */
};
type BaseFieldType<T extends string> = Node & {
  type: T;
  constraint: VoidObject;
  property: VoidObject;
};
type StringField = BaseFieldType<'string'> &
  SearchableProperty &
  SortableProperty &
  MinLengthConstraint &
  MaxLengthConstraint;
type NumberField = BaseFieldType<'number'> &
  SearchableProperty &
  SortableProperty;
type BooleanField = BaseFieldType<'boolean'> & SortableProperty;

// On peut faire des groupe de fields
type Field = StringField | NumberField | BooleanField;

// On peut faire des type guard qui permettent d'affiner un type quand on check une contrainte
type Searchable<T extends Field> = T extends SearchableProperty ? T : never;
type Sortable<T extends Field> = T extends SortableProperty ? T : never;
type MinLengthSettable<T extends Field> = T extends MinLengthConstraint
  ? T
  : never;
type MaxLengthSettable<T extends Field> = T extends MaxLengthConstraint
  ? T
  : never;

// On peut déduire les ensembles des fields qui respectent une contrainte

type SearchableField = Searchable<Field>; // SearchableFields = StringField

type SortableField = Sortable<Field>; // SortableFields = StringField | NumberField
type MinLengthSettableField = MinLengthSettable<Field>; // MinLengthSettableField = StringField

// On peut faire des prédicats
function isSearchable<T extends Field>(field: T): field is Searchable<T> {
  return 'searchable' in field.property && !!field.property.searchable;
}

function hasMinLength<T extends Field>(
  field: T,
): field is MinLengthSettable<T> & DeepRequired<MinLengthConstraint> {
  return (
    'minLength' in field.constraint && field.constraint.minLength !== undefined
  );
}

export type FieldOptions<T extends Field> = Omit<T, 'name' | 'type'>;

// On peut faire des fonctions pour construire les fonctions qui intialisent les fields avec des valeurs par défaut
export function numberFieldFactory(defaults: FieldOptions<NumberField>) {
  return (
    name: string,
    options: Partial<FieldOptions<NumberField>>,
  ): NumberField => ({
    type: 'number',
    name,
    constraint: {
      ...defaults.constraint,
      ...options.constraint,
    },
    property: {
      ...defaults.property,
      ...options.property,
    },
  });
}

// On peut utiliser les fonctioens pour construire les fields
export const numberField = numberFieldFactory({
  property: {
    searchable: true,
    sortable: true,
  },
  constraint: {},
});

const ageField = numberField('age', {});

/**
 * TEST DES TYPES
 */
const f: StringField = {
  type: 'string',
  name: 'stringField',
  constraint: {
    minLength: undefined,
  },
  property: {
    searchable: true,
    sortable: true,
  },
};

const stringField: Field = {
  type: 'string',
  name: 'stringField',
  constraint: {
    minLength: 3,
    maxLength: 10,
  },
  property: {
    sortable: true,
  },
};

if (hasMinLength(stringField)) {
  console.info(stringField.constraint.minLength);
}
