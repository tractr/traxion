import {
  IsString,
  IsUUID,
} from 'class-validator';

export class OpenQuestionUpsertParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
