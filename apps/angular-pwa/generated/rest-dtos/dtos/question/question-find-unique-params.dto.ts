import {
  IsString,
  IsUUID,
} from 'class-validator';

export class QuestionFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
