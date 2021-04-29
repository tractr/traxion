import {
  IsString,
  IsUUID,
} from 'class-validator';

export class QuestionUpsertParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
