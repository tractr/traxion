import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';

export class BoolFilter {
  @IsBoolean()
  @IsOptional()
  equals?: boolean;

  @ValidateNested()
  not?: BoolFilter;
}

export const BoolFilterProps = ['equals'] as Array<keyof BoolFilter>;
