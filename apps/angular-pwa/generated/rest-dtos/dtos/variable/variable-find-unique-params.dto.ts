import {
  IsString,
  IsUUID,
} from 'class-validator';

export class VariableFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
