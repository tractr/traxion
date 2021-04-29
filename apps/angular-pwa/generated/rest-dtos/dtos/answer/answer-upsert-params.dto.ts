import {
  IsString,
  IsUUID,
} from 'class-validator';

export class AnswerUpsertParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
