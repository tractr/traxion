import {
  IsString,
  IsUUID,
} from 'class-validator';

export class OpenQuestionFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
