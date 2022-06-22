import { IsDate, IsOptional, ValidateNested } from 'class-validator';

export class DateTimeFilter {
  @IsDate()
  @IsOptional()
  equals?: Date;

  @IsDate({ each: true })
  @IsOptional()
  in?: Array<Date>;

  @IsDate({ each: true })
  @IsOptional()
  notIn?: Array<Date>;

  @IsDate()
  @IsOptional()
  lt?: Date;

  @IsDate()
  @IsOptional()
  lte?: Date;

  @IsDate()
  @IsOptional()
  gt?: Date;

  @IsDate()
  @IsOptional()
  gte?: Date;

  @ValidateNested()
  not?: DateTimeFilter;
}

export const DateTimeFilterProps = [
  'equals',
  'in',
  'notIn',
  'lt',
  'lte',
  'gt',
  'gte',
] as Array<keyof DateTimeFilter>;
