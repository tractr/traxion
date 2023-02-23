export type Predicate<Super, Type extends Super> = (
  value: Super,
) => value is Type;
