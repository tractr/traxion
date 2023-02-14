export type FieldProperties = {
  label: boolean;
  unique: boolean;
  nullable: boolean;
  multiple: boolean;
  searchable: boolean;
  sortable: boolean;
};

export const defaultFieldProperties: FieldProperties = {
  label: false,
  unique: false,
  nullable: false,
  multiple: false,
  searchable: false,
  sortable: false,
};
