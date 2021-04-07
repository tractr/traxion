import {
  IsString,
  IsUUID,
} from 'class-validator';

export class VariableUpdateParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
