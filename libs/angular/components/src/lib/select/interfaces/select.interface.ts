export interface SelectOptionInterface<Type = unknown> {
  id: string | number;
  label: string;
  value: Type;
}
