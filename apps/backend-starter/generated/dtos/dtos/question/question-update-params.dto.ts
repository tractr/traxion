import {
  IsString,
  IsUUID,
} from 'class-validator';

export class QuestionUpdateParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
