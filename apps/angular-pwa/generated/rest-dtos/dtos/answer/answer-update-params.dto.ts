import {
  IsString,
  IsUUID,
} from 'class-validator';

export class AnswerUpdateParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
