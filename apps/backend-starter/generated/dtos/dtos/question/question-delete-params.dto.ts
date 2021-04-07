import {
  IsString,
  IsUUID,
} from 'class-validator';

export class QuestionDeleteParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
