import {
  IsString,
  IsUUID,
} from 'class-validator';

export class AnswerDeleteParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
