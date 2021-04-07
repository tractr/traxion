import {
  IsString,
  IsUUID,
} from 'class-validator';

export class AnswerFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
