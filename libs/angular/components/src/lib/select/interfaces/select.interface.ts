// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectOptionInterface<Type extends any> {
  id: string | number;
  label: string;
  value: Type;
}
