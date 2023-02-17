type Node = {
  name: string;
  metadata?: Record<string, string>;
  notes?: string;
};

// On déclare toutes les contraintes possibles
type Constraint<Key extends string, Type> = {
  constraint: { [key in Key]: Type };
};

type SearchableConstraint = Constraint<'searchable', boolean>;
type SortableConstraint = Constraint<'sortable', boolean>;

// On construit les fields à partir des contraintes
type StringField = { type: 'string' } & SearchableConstraint &
  SortableConstraint &
  Node;
type NumberField = { type: 'number' } & SearchableConstraint &
  SortableConstraint &
  Node;
type BooleanField = { type: 'boolean' } & SortableConstraint & Node;

// On peut faire des groupe de fields
type Field = StringField | NumberField | BooleanField;

// On peut faire des type guard qui permettent d'affiner un type quand on check une contrainte
type Searchable<T extends Field> = T extends SearchableConstraint ? T : never;
type Sortable<T extends Field> = T extends SortableConstraint ? T : never;

// On peut déduire les ensembles des fields qui respectent une contrainte

type SearchableField = Searchable<Field>; // SearchableFields = StringField

type SortableField = Sortable<Field>; // SortableFields = StringField | NumberField

// On peut faire des prédicats
function isSearchable<T extends Field>(field: T): field is Searchable<T> {
  return 'searchable' in field.constraint && field.constraint.searchable;
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
  });
}

// On peut utiliser les fonctions pour construire les fields
export const numberField = numberFieldFactory({
  constraint: {
    searchable: true,
    sortable: true,
  },
});

/**
 * Version sans les contraintes groupées dans la clé 'constraint'
 */

// On déclare toutes les contraintes possibles
// type RegexConstraint = { regex: RegExp };
// type SearchableConstraint = { searchable: boolean };
// type SortableConstraint = { sortable: boolean };
//
// type CommonConstraint =  SearchableConstraint | SortableConstraint;
// type StringConstraint = CommonConstraint | RegexConstraint;
//
// // On construit les fields à partir des contraintes
// type StringField = { type: 'string' } &  StringConstraint
// type NumberField = { type: 'number' } & SortableConstraint;
//
// // On peut faire des groupe de fields
// type Field = StringField | NumberField;
//
// // On peut faire des type guard qui permettent d'affiner un type quand on check une contrainte
// type Searchable<T extends Field> = T extends SearchableConstraint ? T : never;
// type Sortable<T extends Field> = T extends SortableConstraint ? T : never;
//
// // On peut déduire les ensembles des fiels qui respectent une contrainte
// type SearchableFields = Searchable<Field>; // SearchableFields = StringField
// type SortableFields = Sortable<Field>; // SortableFields = StringField | NumberField
