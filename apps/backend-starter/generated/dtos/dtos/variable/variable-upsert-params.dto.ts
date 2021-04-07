import {
  IsString,
  IsUUID,
} from 'class-validator';

export class VariableUpsertParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
