import {
  IsString,
  IsUUID,
} from 'class-validator';

export class VariableDeleteParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
